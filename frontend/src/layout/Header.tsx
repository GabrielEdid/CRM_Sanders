import React, { useState } from "react";
import {
  AppBar,
  Box,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Link, useLocation, matchPath } from "react-router-dom";
import authProvider from "../authProvider";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authProvider.logout("").then(() => {
      window.location.href = "/login";
    });
  };

  let currentPath: string = location.hash
    ? location.hash.substring(1)
    : location.pathname;

  if (matchPath("/users/*", currentPath)) {
    currentPath = "/users";
  } else if (matchPath("/donators/*", currentPath)) {
    currentPath = "/donators";
  } else if (matchPath("/prueba/*", currentPath)) {
    currentPath = "/prueba";
  }

  return (
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#192459" }}>
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: { xs: "0 10px", sm: "0 20px" },
          }}
        >
          {/* Logo y título */}
          <Box
            display="flex"
            alignItems="center"
            component={Link}
            to="/"
            sx={{
              color: "inherit",
              textDecoration: "inherit",
              gap: 1.5,
            }}
          >
            <Box
              component="img"
              sx={{
                height: { xs: 40, sm: 60, md: 70 },
              }}
              src={"../../assets/images/Logo_Sanders.jpeg"}
              alt={"Fundación Sanders"}
            />
            <Typography
              component="span"
              sx={{
                fontFamily: "Fraunces, serif",
                fontSize: { xs: 16, sm: 22, md: 28 },
              }}
            >
              Fundación Sanders
            </Typography>
          </Box>

          {/* Tabs Scrollable */}
          <Tabs
            value={currentPath}
            variant="scrollable" // Habilita scroll si hay muchas pestañas
            scrollButtons="auto" // Botones de desplazamiento automático
            aria-label="Navigation Tabs"
            indicatorColor="secondary"
            textColor="inherit"
            sx={{
              ".MuiTabs-indicator": {
                backgroundColor: "#ffffff",
                borderRadius: 2,
              },
            }}
          >
            <Tab
              label="Users"
              component={Link}
              to="/users"
              value="/users"
              sx={{
                fontFamily: "Fraunces, serif",
                textTransform: "none",
                fontSize: { xs: 14, sm: 18, md: 22 },
                padding: { xs: "6px", sm: "8px", md: "12px" },
                backgroundColor:
                  currentPath === "/users" ? "#ffffff30" : "transparent",
                color: currentPath === "/users" ? "#ffffff" : "inherit",
                borderRadius: 2,
              }}
            />
            <Tab
              label="Donadores"
              component={Link}
              to="/donators"
              value="/donators"
              sx={{
                fontFamily: "Fraunces, serif",
                textTransform: "none",
                fontSize: { xs: 14, sm: 18, md: 22 },
                padding: { xs: "6px", sm: "8px", md: "12px" },
                backgroundColor:
                  currentPath === "/donators" ? "#ffffff30" : "transparent",
                color: currentPath === "/donators" ? "#ffffff" : "inherit",
                borderRadius: 2,
              }}
            />
            <Tab
              label="Presupuestos"
              component={Link}
              to="/budgets"
              value="/budgets"
              sx={{
                fontFamily: "Fraunces, serif",
                textTransform: "none",
                fontSize: { xs: 14, sm: 18, md: 22 },
                padding: { xs: "6px", sm: "8px", md: "12px" },
                backgroundColor:
                  currentPath === "/budgets" ? "#ffffff30" : "transparent",
                color: currentPath === "/budgets" ? "#ffffff" : "inherit",
                borderRadius: 2,
              }}
            />
          </Tabs>

          {/* Icono de configuración más pequeño */}
          <Box display="flex" alignItems="center">
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <SettingsIcon fontSize="medium" /> {/* Cambiado a medium */}
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => {}}>
                <ListItemIcon>
                  <RefreshIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Refresh</ListItemText>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
