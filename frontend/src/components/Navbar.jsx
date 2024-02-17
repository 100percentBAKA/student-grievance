//* images imports
import rnsLogo from "../assets/rnsit-logo.jpg";

//* MUI components imports
import { useTheme } from "@mui/material/styles";
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  alpha,
  styled,
  useMediaQuery,
} from "@mui/material";

//* MUI icons imports
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useEffect, useState } from "react";
import useFetchData from "../hooks/useFetchData";

//? styled components
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.white,
  // backgroundColor: "green",
}));

const StyledAppBarCtn = styled(Box)(({ theme }) => ({
  width: "1200px", // desktop first approach
  margin: "auto",
  // backgroundColor: "red",

  padding: theme.spacing(1),

  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",

  [theme.breakpoints.down("xl")]: {
    width: "1000px",
  },

  [theme.breakpoints.down("lg")]: {
    width: "900px",
  },

  [theme.breakpoints.down("md")]: {
    width: "600px",
  },

  [theme.breakpoints.down("sm")]: {
    width: "300px",
  },
}));

const StyledImg = styled("img")(({ theme }) => ({
  maxWidth: "100%",
  height: "61px",
  transition: "height 0.3s ease-in-out",

  [theme.breakpoints.down("lg")]: {
    height: "51px",
  },

  [theme.breakpoints.down("md")]: {
    height: "43px",
  },

  [theme.breakpoints.down("sm")]: {
    height: "36px",
  },
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[900], 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.grey[900], 0.25),
  },
  width: "40%",

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const StyledMenuBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(3),

  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(2),
  },
}));

//? custom components
const listView = [
  {
    id: 1,
    text: "Profile",
    icon: <Avatar />,
  },
  {
    id: 2,
    text: "My Account",
    icon: <Avatar />,
  },
  {
    id: 3,
    text: "Notification",
    icon: (
      <Badge badgeContent={3} color="error">
        <NotificationsIcon />
      </Badge>
    ),
  },
  {
    id: 5,
    text: "Settings",
    icon: <SettingsIcon />,
  },
  {
    id: 6,
    text: "Logout",
    icon: <LogoutIcon />,
  },
];

//* constants
//? email will come from the user side
const email = "1rn21cs011.adarshgs@gmail.com";
const usn = email.substring(0, 10);

//? menu data
//! handle this data upon student login
// const menuData = {
//   name: "Adarsh G S",
//   usn: "1RN21CCS011",
//   email: "1rn21cs011.adarshgs@gmail.com",
// };

const ListComponent = ({ closeMenu }) => (
  <List>
    {listView.map((item) => (
      <ListItem key={item.id}>
        <ListItemButton onClick={closeMenu}>
          {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
          <ListItemText primary={item.text} />
        </ListItemButton>
      </ListItem>
    ))}
  </List>
);

export default function Navbar() {
  //? states for menu and drawer
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  //? states for handling notification and menu badge no
  const [noNotif, setNoNotif] = useState(4);
  const [menuBadge, setMenuBadge] = useState(true);

  // ? custom fetchData query
  const { data: loginData, error: loginError } = useFetchData(
    `http://localhost:8080/user/login/${email}`
  );

  useEffect(() => {
    if (loginData) {
      const details = {
        ...loginData,
        usn,
        email,
      };
      localStorage.setItem("userDetails", JSON.stringify(details));
    }
  }, [loginData, loginError]);

  const menuData = JSON.parse(localStorage.getItem("userDetails"));

  //? handle notification badge, useEffect prevents infinite loop
  useEffect(() => {
    if (noNotif === 0) setMenuBadge(false);
  }, [noNotif]);

  //? useMediaQuery
  const theme = useTheme();
  const isScreenSmaller = useMediaQuery(theme.breakpoints.down("md"));

  const open = Boolean(anchorElMenu);
  const handleProfileClick = (event) => {
    setAnchorElMenu(event.currentTarget);
    setShowDrawer(true);
    setMenuBadge(false);
  };
  const handleProfileClose = () => {
    setAnchorElMenu(null);
  };

  return (
    <StyledAppBar position="fixed">
      <StyledAppBarCtn>
        <StyledImg src={rnsLogo} alt="RNSIT LOGO" />

        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Tooltip title="Menu">
            <IconButton
              id="menu-btn-navbar"
              size="large"
              edge="end"
              aria-label="account of current user"
              color="inherit"
              aria-controls={open ? "menu-view-navbar" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleProfileClick}
            >
              <Badge badgeContent={menuBadge ? 1 : 0} color="error">
                <Avatar alt="User" />
              </Badge>
            </IconButton>
          </Tooltip>

          {isScreenSmaller ? (
            <Drawer
              anchor="left"
              open={showDrawer}
              onClose={(e) => setShowDrawer(false)}
              variant="temporary"
            >
              <ListComponent closeMenu={() => setShowDrawer(false)} />
            </Drawer>
          ) : (
            <Menu
              anchorEl={anchorElMenu}
              open={open}
              onClose={handleProfileClose}
            >
              <StyledMenuBox>
                <Box sx={{ marginRight: 2 }}>
                  <Avatar sx={{ width: 56, height: 56 }} />
                </Box>
                <Box>
                  <Box sx={{ fontSize: "25px", fontWeight: 600 }}>
                    {`${menuData.firstname} ${menuData.lastname}`}
                  </Box>
                  <Box sx={{ fontSize: "13px", fontWeight: 600 }}>
                    {menuData.usn.toUpperCase()}
                  </Box>
                  <Box sx={{ fontSize: "13px" }}>{menuData.email}</Box>
                </Box>
              </StyledMenuBox>

              <Divider />

              <MenuItem>
                <ListItemIcon>
                  <Badge badgeContent={noNotif} color="error">
                    <NotificationsIcon fontSize="small" />
                  </Badge>
                </ListItemIcon>
                Notification
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <SettingsIcon fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <LogoutIcon fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          )}
        </Box>
      </StyledAppBarCtn>
    </StyledAppBar>
  );
}
