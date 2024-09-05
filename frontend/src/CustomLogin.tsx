import { useLogin, useNotify, Notification } from "react-admin";
import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const CustomLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useLogin(); // Hook to trigger login
  const notify = useNotify(); // Hook to display notifications

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password }).catch(() =>
      notify("Invalid credentials", { type: "warning" })
    );
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/images/background.webp')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        sx={{
          padding: 3,
          width: 300,
          backgroundColor: "#192459",
          borderRadius: 5,
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            sx={{ textAlign: "center", marginBottom: 2, color: "white" }}
          >
            Inicio de sesión
          </Typography>
          <Box
            component="img"
            sx={{
              display: "block",
              margin: "0 auto",
              textAlign: "center",
              height: { xs: 50, sm: 70, md: 90 },
            }}
            src={"/assets/images/Logo_Sanders.jpeg"} // Asegúrate de que la imagen del logo esté en public
            alt={"Fundación Sanders"}
          />
          <Typography
            component="span"
            sx={{
              fontFamily: "Fraunces, serif",
              color: "white",
              fontSize: { xs: 14, sm: 18, md: 22 },
              textAlign: "center",
              display: "block",
            }}
          >
            Fundación Sanders
          </Typography>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              sx={{ backgroundColor: "white", borderRadius: 2 }}
              required
            />
            <TextField
              fullWidth
              label="Contraseña"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
              }}
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "white", // Custom background color
                color: "#192459", // Custom text color
                "&:hover": {
                  backgroundColor: "#B0B0B0", // Custom hover color
                },
                marginTop: 2,
                textTransform: "none",
              }}
            >
              Iniciar Sesión
            </Button>
          </form>
        </CardContent>
      </Card>
      <Notification />
    </Box>
  );
};

export default CustomLogin;
