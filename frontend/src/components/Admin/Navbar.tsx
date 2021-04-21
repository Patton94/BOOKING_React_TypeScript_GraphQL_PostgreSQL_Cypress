import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { NavLink, BrowserRouter as Router } from "react-router-dom";
import { useAdminStore } from "../../store/adminStore";

import {
  Drawer,
  Button,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";
import DateRangeIcon from "@material-ui/icons/DateRange";
import PeopleIcon from "@material-ui/icons/People";
import StoreIcon from "@material-ui/icons/Store";
import WorkIcon from "@material-ui/icons/Work";
import SettingsIcon from "@material-ui/icons/Settings";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// ! STYLES
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
  navLink: {
    textDecoration: "none",
    color: "black",
  },
  menuBtn: {
    height: "30px",
    backgroundColor: "transparent",
    boxShadow: "none",
    border: "none",
  },
});

// ! MENU ITEMS DATA
// #region

interface NavItem {
  text: string;
  route: string;
  icon: any;
}

interface NavButton {
  text: string;
  action: string;
  icon: any;
}

const upMenu: NavItem[] = [
  { text: "Obsługa rezerwacji", route: "/", icon: <DateRangeIcon /> },
  { text: "Pracownicy", route: "/employees", icon: <PeopleIcon /> },
  { text: "Punkty usługowe", route: "/points", icon: <StoreIcon /> },
  { text: "Usługi", route: "/services", icon: <WorkIcon /> },
];

const downMenu: NavItem[] = [
  { text: "Ustawienia", route: "/settings", icon: <SettingsIcon /> },
  { text: "Admin", route: "/admin", icon: <PersonIcon /> },
];

const otherMenu: NavButton[] = [
  { text: "Wyloguj", action: "logout", icon: <ExitToAppIcon /> },
];
// #endregion

// ! MAIN FUNCTION
const Navbar: React.FC = () => {
  const classes = useStyles();
  const adminStore = useAdminStore();
  const [isOpen, setIsOpen] = useState(false);

  //   * TOGGLE NAVBAR
  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  //   * NAVBAR BUTTONS CLICK
  const handleClick = (action: string) => {
    switch (action) {
      case "logout":
        return adminStore.logoutAdmin();
      default:
        return console.log("Such action does not exist");
    }
  };

  //   * NAVBAR LIST
  const navItemsList = () => (
    <div
      className={classes.fullList}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <List>
        {upMenu.map((item) => (
          <NavLink
            className={classes.navLink}
            to={item.route}
            exact={item.route === "/" ? true : false}
            key={item.text}
          >
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {downMenu.map((item) => (
          <NavLink className={classes.navLink} to={item.route} key={item.text}>
            <ListItem button>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
      <List>
        {otherMenu.map((item) => (
          <ListItem button key={item.text} onClick={() => handleClick(item.action)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  //   ! RETURN
  return (
    <div>
      <>
        <Router>
          <Button className={classes.menuBtn} variant="contained" onClick={toggleDrawer}>
            {<MenuIcon />}
          </Button>
          <Drawer open={isOpen} onClose={toggleDrawer}>
            {navItemsList()}
          </Drawer>
        </Router>
      </>
    </div>
  );
};

export default Navbar;
