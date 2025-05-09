import { Container, TextField, Typography, InputAdornment, Tooltip } from "@mui/material"
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

    useEffect(() => {
        const url = 'https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all';
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
        
    }, [setWorkers]);

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
    </Container>
  )
}
