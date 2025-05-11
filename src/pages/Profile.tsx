import { Container, Avatar, Box, Typography, Skeleton, Paper} from "@mui/material";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import type { Worker } from "../types";

export const Profile = () => {
  const getAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

  const { id } = useParams();
  const [worker, setWorker] = useState<Worker | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users?__example=all", {
        headers: { "Content-Type": "application/json" }
      })
      .then((res) => {
        const found = res.data.items.find((item: Worker) => item.id === id);
        if (found) {
          setWorker(found);
        } else {
          setError("Сотрудник не найден");
        }
      })
      .catch(() => setError("Ошибка при загрузке профиля"))
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return <Skeleton variant="rectangular" width="100%" height={200} />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!worker) {
    return null;
  }

  return (
    <Container sx={{ mt: 4 }}>
      <Paper sx={{ padding: 2, backgroundColor: "#f1f1f1", borderRadius: 2 }}>
        <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
          <Avatar src={worker.avatarUrl} sx={{ width: 120, height: 120, marginBottom: 2 }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
            {worker.firstName} {worker.lastName}
          </Typography>
          <Typography color="text.secondary">{worker.department}</Typography>
        </Box>
      </Paper>
        <Box mt={3}>
          <Typography>Дата рождения: {new Date(worker.birthday).toLocaleDateString()}</Typography>
          <Typography align="right">
              {getAge(new Date(worker.birthday))} лет
          </Typography>
        </Box>
      
    </Container>
  );
};
