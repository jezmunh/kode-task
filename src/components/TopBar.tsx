import { Container, TextField, Typography, InputAdornment, Tooltip, Link, Box,  Dialog, DialogTitle, DialogContent, DialogActions, Button, FormControl, Radio, RadioGroup, FormLabel, FormControlLabel} from "@mui/material"
import SearchIcon from '@mui/icons-material/Search'
import TuneIcon from '@mui/icons-material/Tune'
import axios, { Axios } from 'axios'

import '../Main.scss'
import { useEffect, useState } from "react"

import type { Worker } from "../types";

interface Props {
  setWorkers: React.Dispatch<React.SetStateAction<Worker[] | null>>;
}


export const TopBar = ({setWorkers}: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [allWorkers, setAllWorkers] = useState<Worker[] | null>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [sortOption, setSortOption] = useState('alphabetical');

    const [activeCategory, setActiveCategory] = useState('all');

    const links = [
        {label: "Все", value: "all"},
        {label: "Designers", value: "designers"},
        {label: "Analysts", value: "analytics"},
        {label: "Managers", value: "managment"},
        {label: "IOS", value: "ios"},
        {label: "Android", value: "android"},
        {label: "Frontend", value: "frontend"},
        {label: "Backend", value: "backend"},
        {label: "Support", value: "support"},
    ];


    useEffect(() => {
  const url = `https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=${activeCategory}`;
  setIsLoading(true);
  axios
    .get(url, { headers: { "Content-Type": "application/json" } })
    .then((res) => {
      const fetched = res.data.items;
      setAllWorkers(fetched);
      setWorkers(fetched); 
    })
    .catch((err) => setError(err))
    .finally(() => setIsLoading(false));
}, [activeCategory, setWorkers]);


    isLoading && console.log("Загрузка...")
    error && console.log("Ошибка!")
    
    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
  if (!allWorkers) return;
  
  const filtered = allWorkers.filter((worker) => {
    const fullName = `${worker.firstName} ${worker.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      worker.userTag.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  setWorkers(filtered);
}, [searchTerm, allWorkers, setWorkers]);
  const handleApplyFilters = () => {
    setOpen(false);

    setWorkers((prevWorkers) => {
      if (!prevWorkers) return null;

      const sortedWorkers = [...prevWorkers];
      if (sortOption === 'alphabetical') {
        sortedWorkers.sort((a, b) => `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`));
      } else if (sortOption === 'birthdate') {
        sortedWorkers.sort((a, b) => new Date(a.birthday).getTime() - new Date(b.birthday).getTime());
      }
      setSearchTerm('');
      return sortedWorkers;
    });
  };
    return (
        <Container>
            <Typography variant="h4" sx={{ fontWeight: "bold"}}>Поиск</Typography>
            <TextField className="my-input" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
                sx={{ width: 1, py: 3}} 
                placeholder="Введи имя, тег, почту..." 
                variant="outlined" 
                slotProps={{
                input: {
                    startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
                    endAdornment: <Tooltip title="Фильтр" arrow><InputAdornment position="end"><TuneIcon sx={{cursor: "pointer"}} onClick={handleOpen}/></InputAdornment></Tooltip>
                },
                }}
        />
       <Box
  sx={{
    display: "flex",
    gap: 4,
    py: 2,
    flexWrap: "wrap",
  }}
>
 <Box
  sx={{
    display: "flex",
    gap: 4,
    py: 2,
    overflowX: "auto",
    whiteSpace: "nowrap",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": { display: "none" },
  }}
>
  {links.map((item) => (
    <Link
      key={item.value}
      href="#"
      underline="none"
      onClick={() => setActiveCategory(item.value)}
      sx={{
        color: activeCategory === item.value ? "#000" : "#97979b",
        fontWeight: activeCategory === item.value ? "bold" : "normal",
        fontSize: "1.2rem",
        borderBottom: activeCategory === item.value ? "2px solid #007aff" : "2px solid transparent",
        transition: "all 0.2s",
        paddingBottom: "4px",
        cursor: "pointer",
        display: "inline-block", 
      }}
    >
      {item.label}
    </Link>
  ))}
</Box>
</Box>
    <Dialog open={open} onClose={handleClose} fullWidth>
  <DialogTitle>
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Typography variant="h6" sx={{ textAlign: "center", fontWeight: "bold", flexGrow: 1 }}>
        Сортировка
      </Typography>
      <Button
        onClick={handleClose}
        sx={{ position: "absolute", right: 0, top: 0, minWidth: "auto", padding: 1 }}
      >
        ✕
      </Button>
    </Box>
  </DialogTitle>

  <DialogContent>
    <FormControl>
      <RadioGroup
        value={sortOption}
        onChange={(e) => {
          const value = e.target.value;
          setSortOption(value);

          
          setWorkers((prevWorkers) => {
            if (!prevWorkers) return null;

            const sorted = [...prevWorkers];
            if (value === "alphabetical") {
              sorted.sort((a, b) =>
                `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`)
              );
            } else if (value === "birthdate") {
              sorted.sort(
                (a, b) => new Date(a.birthday).getTime() - new Date(b.birthday).getTime()
              );
            }
            return sorted;
          });

          handleClose(); 
        }}
      >
        <FormControlLabel
          value="alphabetical"
          control={<Radio />}
          label="В алфавитном порядке"
        />
        <FormControlLabel
          value="birthdate"
          control={<Radio />}
          label="По дате рождения"
        />
      </RadioGroup>
    </FormControl>
  </DialogContent>
</Dialog>


    </Container>
  )
}
