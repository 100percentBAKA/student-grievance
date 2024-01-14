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
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";

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
  height: "71px",
  transition: "height 0.3s ease-in-out", // css approach

  [theme.breakpoints.down("lg")]: {
    height: "61px",
  },

  [theme.breakpoints.down("md")]: {
    height: "51px",
  },

  [theme.breakpoints.down("sm")]: {
    height: "41px",
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

const StyledIconBox = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",

  [theme.breakpoints.down("md")]: {
    display: "none",
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
      <Badge badgeContent={17} color="error">
        <NotificationsIcon />
      </Badge>
    ),
  },
  {
    id: 4,
    text: "Messages",
    icon: (
      <Badge badgeContent={4} color="error">
        <MailIcon />
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
  // states
  const [anchorElMenu, setAnchorElMenu] = useState(null);
  const [showDrawer, setShowDrawer] = useState(false);

  //? useMediaQuery
  const theme = useTheme();
  const isScreenSmaller = useMediaQuery(theme.breakpoints.down("md"));

  const open = Boolean(anchorElMenu);
  const handleProfileClick = (event) => {
    setAnchorElMenu(event.currentTarget);
    setShowDrawer(true);
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
          <StyledIconBox>
            <Tooltip title="Mail">
              <IconButton
                disableRipple
                size="large"
                aria-label="show 4 new mails"
                color="inherit"
              >
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title="Notifications">
              <IconButton
                disableRipple
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
          </StyledIconBox>
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
              <Avatar alt="User" />
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
              id="menu-view-navbar"
              open={open}
              onClose={handleProfileClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClose={handleProfileClose}>
                <Avatar /> Profile
              </MenuItem>
              <MenuItem>
                <Avatar /> My account
              </MenuItem>
              <Divider />
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
