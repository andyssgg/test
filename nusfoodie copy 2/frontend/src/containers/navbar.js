import * as React from 'react';
import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NUSFoodieVlogo from "../assets/logoV.png"
import { useContext } from 'react';
import UserContext from '../UserContext';
import { withCookies } from 'react-cookie';

const ResponsiveAppBar = (props) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user } = useContext(UserContext);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        props.cookies.remove('user', { path: '/' });
        window.location.href = "/";
    };
    
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar sx={{ background: '#FFC95F', boxShadow: 'none' }}>
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ minHeight: '10000000em' }}>
                    <Box sx={{ width: "20%", flexGrow: 1, display: { xs: 'flex', md: 'none' }, pt: 0 }}>
                        <IconButton
                            size="medium"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="default"
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box sx={{ flexGrow: 1 }}>
                            <img src={NUSFoodieVlogo} alt="NUSFoodie" style={{ minWidth: "3.5em", maxWidth: "5.5em", marginBottom: "14px", paddingTop: "10px" }} />
                        </Box>
                        <Box sx={{ flexGrow: 1 }} />
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            <MenuItem onClick={handleCloseNavMenu} sx={{ display: "flex", justifyContent: "flex-end" }} component={Link} to="/establishments">
                                <Typography textAlign="center">Canteens</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} sx={{ display: "flex", justifyContent: "flex-end" }} component={Link} to="/cuisines">
                                <Typography textAlign="center">Cuisines</Typography>
                            </MenuItem>
                            <MenuItem onClick={handleCloseNavMenu} sx={{ display: "flex", justifyContent: "flex-end" }} component={Link} to="/reviews">
                                <Typography textAlign="center">Food reviews</Typography>
                            </MenuItem>

                            <List
                                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                            >
                                <ListItemButton onClick={handleClick}>
                                    <ListItemText primary="Resources" />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                </Collapse>
                            </List>
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, width: '30%', justifyContent: "flex-end", m: 1 }}>
                        <img src={NUSFoodieVlogo} alt="NUSFoodie_" style={{ minWidth: 30, maxHeight: 40, width: '20%' }}/>
                        <Box sx={{ flexGrow: 1 }} />

                        {/* Desktop Menu Items */}
                        <MenuItem component={Link} to="/establishments">
                        <Typography textAlign="center">Canteens</Typography>
                        </MenuItem>
                        <MenuItem component={Link} to="/cuisines">
                        <Typography textAlign="center">Cuisines</Typography>
                        </MenuItem>
                        <MenuItem component={Link} to="/reviews">
                        <Typography textAlign="center">Food reviews</Typography>
                        </MenuItem>


                        {user ? (

                            <div>
                      
                                <Button variant="contained" href='/review-form' sx={{ bottom: 0, left: "88%", mt: '1em', backgroundColor: '#390A9D' }}>Write a Review</Button>
                                <Button onClick={handleLogout} variant="contained"  sx={{ bottom: 0, left: "90%", mt: '1em', backgroundColor: '#390A9D' }}>
                                    Logout
                                </Button>
                            </div>

                            
                        ) : (
                            <>
                                <Button variant="contained" href="/login" sx={{ ml: 2, backgroundColor: '#390A9D' }}>
                                    Login
                                </Button>
                                <Button variant="contained" href="/signup" sx={{ ml: 2, backgroundColor: '#390A9D' }}>
                                    Sign Up
                                </Button>
                            </>
                        )}

                        </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}
export default withCookies(ResponsiveAppBar);
