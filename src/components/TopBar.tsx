import { Container, TextField, Typography, InputAdornment, Tooltip, Link, Box } from "@mui/material"
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
                    endAdornment: <Tooltip title="Фильтр" arrow><InputAdornment position="end"><TuneIcon sx={{cursor: "pointer"}}/></InputAdornment></Tooltip>
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
    </Container>
  )
}
