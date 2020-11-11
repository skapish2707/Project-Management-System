import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useHistory } from "react-router-dom";
import MenuIcon from '@material-ui/icons/Menu';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { Link } from "react-router-dom";
import SERVER_URL from "../../Pages/URL";
import axios from "axios";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import HomeIcon from '@material-ui/icons/Home';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import Divider from '@material-ui/core/Divider';

const kickUser = () => {
  axios({
    method: "get",
    url: SERVER_URL + "/logout",
    withCredentials: true,
    headers : {
      Authorization : 'Bearer '+ localStorage.getItem("access_token") 
    }
  })
    .then(function (res) {
      console.log(res.data);
    })
    .catch(function (err) {
      console.log(err);
    });
};

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    textAlign: "left"
  },
  profIcon: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  navMenu: {
    [theme.breakpoints.down("sm")]: {
      display: "none"
    },
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  },
  ButtonStyle:{
    color:"#000",
    backgroundColor:"#e0e0e0",
    padding:"0px 5px",
    cursor:"pointer",
    borderRadius:"2px",
    marginRight:"10px",
    "&:hover": {
      backgroundColor: '#fff'
    }
    
  },
  

}));


export default function SideMenu(props) {
  const classes = useStyles();
  const auth = true;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const histor = useHistory();
   const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
   const itemsList = [
    {
      text: "Home",
      icon: <HomeIcon />,
      onClick: () => histor.push("/hod")
    },
    {
      text: "Groups",
      icon: <PeopleAltIcon/>,
      onClick: () => histor.push("/hod/groups")
    }
  ];

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
      {itemsList.map((item, index) => {
          const { text, icon, onClick } = item;
          return (
            <React.Fragment>
            <ListItem button key={text} onClick={onClick} style={{marginRight:"40px"}}>
              {icon && <ListItemIcon>{icon}</ListItemIcon>}
              <ListItemText primary={text} />
            </ListItem>
            <Divider/>
            </React.Fragment>
          );
        })}
      </List>
     
    </div>
  );

  return (
        <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)} >
            {list(anchor)}
          </Drawer>
          <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#000" }}>
        <Toolbar>
        <MenuIcon fontSize="large" onClick={toggleDrawer(anchor, true)} className={classes.ButtonStyle} style={{}}/>
          <Typography variant="h5" className={classes.title}>
            Project Management System
          </Typography>
          {auth && (
            <div className={classes.profIcon}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle style={{ fontSize: 40 }} />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/cp@2707user"
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    Change Password
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    to="/logout"
                    onClick={kickUser}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    Logout
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          )}
          <Link
            to="/cp@2707user"
            className={classes.navMenu}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <Button
              color="inherit"
              variant="contained"
              startIcon={<AssignmentIndIcon />}
            >
              Change Password
            </Button>
          </Link>
          <Link
            to="/logout"
            onClick={kickUser}
            className={classes.navMenu}
            style={{ textDecoration: "none", color: "#000" }}
          >
            <Button
              color="inherit"
              variant="contained"
              style={{ marginLeft: "20px" }}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
          </React.Fragment>
          ))}
    </div>
          
      
     
  );
}
