import React, { useContext, useState } from 'react';
// import { UserContext } from '../../App';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import "./NavBar.css"
import { ExitToApp, Home } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import { UserContext } from '../../App';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

const NavBar = () => {

    // const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    // const [loggedInUser, setLoggedInUser] = useState({
    //     name: "Sazzad"
    // })

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);


    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };



    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';


    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {loggedInUser.name &&
                <MenuItem>

                    <Link to="/" onClick={() => { setLoggedInUser({}) }}>
                        <Button aria-label="show 11 new notifications" color="inherit">
                            <ExitToApp /><p className="LogOut">LogOut</p>
                        </Button>
                    </Link>

                </MenuItem>
            }
            <MenuItem onClick={handleProfileMenuOpen}>
                <Button
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </Button>
                {loggedInUser.name ? <p className="userName">{loggedInUser.name}</p> : <Link to="/logIn"> LogIn </Link>}
            </MenuItem>
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar style={{ background: '#1976D2' }} position="static">
                <Toolbar className="innerDiv">
                    <Button
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <Link to="/"><Home /></Link>
                    </Button>
                    <Typography className={classes.title} variant="h6" noWrap>
                        <Link to="/"> DreamShop</Link>
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>


                        <Button
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                            disabled
                        >
                            {/* <AccountCircle /> <p className="userName">{loggedInUser.name}</p>*/}
                            {loggedInUser.name &&
                                <img className="MenuImage" src={loggedInUser.image} alt="" srcset="" />
                            }

                        </Button>
                        {loggedInUser.name &&
                            <Button>
                                <Link to="/dashbord"><p className="LogOut">Admin</p></Link>
                            </Button>
                        }
                        {loggedInUser.name &&
                            <Button>
                                <Link to="/myOrders"><p className="LogOut">Orders</p></Link>
                            </Button>
                        }

                        {!loggedInUser.name &&
                            <Button aria-label="show 4 new mails" color="inherit">

                                <Link to="/login"><p className="LogOut">LogIn</p> </Link>

                            </Button>
                        }
                        {loggedInUser.name &&
                            <Button color="inherit">

                                <Link to="/" onClick={() => { setLoggedInUser({}) }}><p className="LogOut">LogOut</p></Link>

                            </Button>
                        }
                    </div>
                    <div className={classes.sectionMobile}>
                        <Button
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}

        </div>
    );
};

export default NavBar;