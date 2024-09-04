import React, { useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import RefreshIcon from "@mui/icons-material/Refresh";
import {
  AppBar,
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Menu,
} from "@mui/material";
import {
  LoadingIndicator,
  Logout,
  usePermissions,
  UserMenu,
  useUserMenu,
} from "react-admin";
import { Link, matchPath, useLocation } from "react-router-dom";
import authProvider from "../authProvider";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const { permissions } = usePermissions();

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    authProvider.logout("").then(() => {
      // Redirige o actualiza el estado después del logout
      window.location.href = "/login"; // Por ejemplo, redirigir al login
    });
  };

  let currentPath: string = location.hash
    ? location.hash.substring(1)
    : location.pathname;

  if (matchPath("/users/*", currentPath)) {
    currentPath = "/users";
  } else if (matchPath("/donators/*", currentPath)) {
    currentPath = "/donators";
  }

  return (
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#192459" }}>
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between", // Ensures items spread evenly
            alignItems: "center",
          }}
        >
          <Box flex={1} display="flex" justifyContent={"space-between"}>
            <Box
              display="flex"
              alignItems="center"
              component={Link}
              to="/"
              sx={{
                color: "inherit",
                textDecoration: "inherit",
              }}
              gap={1.5}
            >
              <Box
                component="img"
                sx={{ height: 70 }}
                src={"../../assets/images/Logo_Sanders.jpeg"}
                alt={"Fundación Sanders"}
              />
              <Typography
                component="span"
                sx={{ fontFamily: "Fraunces, serif", fontSize: 30 }}
              >
                Fundación Sanders
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" marginRight={20}>
              <Tabs
                value={currentPath}
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
                    fontSize: 25,
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
                    fontSize: 25,
                    backgroundColor:
                      currentPath === "/donators" ? "#ffffff30" : "transparent",
                    color: currentPath === "/donators" ? "#ffffff" : "inherit",
                    borderRadius: 2,
                  }}
                />
              </Tabs>
            </Box>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <SettingsIcon fontSize="large" />
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
