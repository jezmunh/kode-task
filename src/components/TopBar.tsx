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
        try {
            axios.get(url, {headers: {"Content-Type": "application/json"}}).then((res) => {
            const allWorkers = res.data.items;
            setWorkers(allWorkers);
        })
        } catch(err) {
            setError(err);
        }finally {
            setIsLoading(false);
        }
        
    }, [activeCategory, setWorkers]);

    isLoading && console.log("Загрузка...")
    error && console.log("Ошибка!")
    
    const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSortOption(event.target.value);
  };

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
      return sortedWorkers;
    });
  };
    return (
        <Container>
            <Typography variant="h4" sx={{ fontWeight: "bold"}}>Поиск</Typography>
            <TextField className="my-input" 
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
      }}
    >
      {item.label}
    </Link>
  ))}
</Box>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Фильтры</DialogTitle>
        <DialogContent>
          <FormControl>
            <FormLabel>Сортировать по</FormLabel>
            <RadioGroup value={sortOption} onChange={handleSortChange}>
              <FormControlLabel value="alphabetical" control={<Radio />} label="В алфавитном порядке" />
              <FormControlLabel value="birthdate" control={<Radio />} label="По дате рождения" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Закрыть</Button>
          <Button onClick={handleApplyFilters} variant="contained">Применить</Button>
        </DialogActions>
      </Dialog>

    </Container>
  )
}
