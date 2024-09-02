import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
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
} from "@mui/material";
import {
  LoadingIndicator,
  Logout,
  usePermissions,
  UserMenu,
  useUserMenu,
} from "react-admin";
import { Link, matchPath, useLocation } from "react-router-dom";
// import { useConfigurationContext } from "../root/ConfigurationContext";

const Header = () => {
  //   const { logo, title } = useConfigurationContext();
  const location = useLocation();
  const { permissions } = usePermissions();

  let currentPath: string | boolean = "/";
  if (matchPath("/", location.pathname)) {
    currentPath = "/";
  } else if (matchPath("/contacts/*", location.pathname)) {
    currentPath = "/contacts";
  } else if (matchPath("/companies/*", location.pathname)) {
    currentPath = "/companies";
  } else if (matchPath("/deals/*", location.pathname)) {
    currentPath = "/deals";
  } else {
    currentPath = false;
  }

  return (
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <Toolbar variant="dense">
          <Box flex={1} display="flex" justifyContent="space-between">
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
              <Box component="img" sx={{ height: 24 }} src={""} alt={"test"} />
              <Typography component="span" variant="h5">
                {/* {title} */}
                Test
              </Typography>
            </Box>
            <Box>
              <Tabs
                value={currentPath}
                aria-label="Navigation Tabs"
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab label={"Dashboard"} component={Link} to="/" value="/" />

                <Tab
                  label={"Donadores"}
                  component={Link}
                  to="/donators"
                  value="/donators"
                />
              </Tabs>
            </Box>
            <Box display="flex" alignItems="center">
              <LoadingIndicator />
              <UserMenu>
                <ConfigurationMenu />
                {permissions === "admin" && <UsersMenu />}
                <Logout />
              </UserMenu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const UsersMenu = () => {
  const { onClose } = useUserMenu() ?? {};
  return (
    <MenuItem component={Link} to="/sales" onClick={onClose}>
      <ListItemIcon>
        <PeopleIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Users</ListItemText>
    </MenuItem>
  );
};

const ConfigurationMenu = () => {
  const { onClose } = useUserMenu() ?? {};
  return (
    <MenuItem component={Link} to="/settings" onClick={onClose}>
      <ListItemIcon>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>My info</ListItemText>
    </MenuItem>
  );
};
export default Header;
