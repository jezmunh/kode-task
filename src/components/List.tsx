import type { Worker } from "../types";
import { Avatar, Container, Box, Typography, Paper} from "@mui/material"

interface Props {
  info: Worker[] | null;
}

export const List = ({ info }: Props) => {
  if (!info) return <div>Нет данных</div>;

  return (
    <Container sx={{ mt: 4 }}>
      {info.map((item) => (
        <Paper
          key={item.id}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            padding: 2,
            marginBottom: 2,
          }}
        >
          <Avatar src={item.avatarUrl} sx={{ width: 56, height: 56 }} />
          <Box>
            <Typography variant="h6">
              {item.firstName} {item.lastName}{" "}
              <Typography component="span" sx={{ color: "gray", fontSize: "0.9rem" }}>
                @{item.userTag}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.department}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Container>
  );
};
