import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid';
import { ThemeProvider } from '@mui/material/styles'

import { useNavigate } from 'react-router-dom'
import ProfileModal from './ProfileModal';
import AccommodationModal from './AccommodationModal';


const HostNavigation = (props) => {
    let navigate = useNavigate();

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const [accommodationOpen, setAccommodationOpen] = React.useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleAccommodationOpen = () => setAccommodationOpen(true);
    const handleAccommodationClose = () => setAccommodationOpen(false);
    return (
        <div>
            <AppBar position="static" sx={{ bgcolor: '#11296b' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Grid container alignItems={'center'}>
                            <Grid item xs={2}>
                                {/* Title */}
                                <Typography
                                    variant="h6"
                                    noWrap
                                    component="div"
                                    sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                                >
                                    BOOKING APP
                                </Typography>
                            </Grid>

                            <Grid item xs={1}>
                                <ThemeProvider theme={props.activeButtonTheme}>
                                    <Button
                                        key='Active'
                                        onClick={props.toggleActive}
                                        sx={{
                                            my: 3,
                                            display: 'block',
                                            borderRadius: 15,
                                            width: 100
                                        }}
                                        variant="contained"
                                    >
                                        Active
                                    </Button>
                                </ThemeProvider>
                            </Grid>

                            <Grid item xs={5}>
                                <ThemeProvider theme={props.pastButtonTheme}>
                                    <Button
                                        key='Past'
                                        onClick={props.togglePast}
                                        sx={{
                                            my: 3,
                                            display: 'block',
                                            borderRadius: 15,
                                            width: 100
                                        }}
                                        variant="contained"
                                    >
                                        Past
                                    </Button>
                                </ThemeProvider>
                            </Grid>

                            {/* Menu items */}
                            <Grid item xs={2}>
                                <Button
                                    key='Add Accomodation'
                                    onClick={handleAccommodationOpen}
                                    sx={{ my: 3, color: 'white', display: 'block' }}
                                >
                                    Add Accommodation
                                </Button>
                            </Grid>

                            {/* User Profile */}
                            <Grid item xs={2}>
                                <Box sx={{ flexGrow: 0 }}>
                                    <Tooltip title="Open settings">
                                        <Card onClick={handleOpenUserMenu} sx={{ p: 0, width: '250px' }}>
                                            <CardActionArea>
                                                <CardContent>
                                                    <Typography sx={{
                                                        display: '-webkit-box',
                                                        overflow: 'hidden',
                                                        WebkitBoxOrient: 'vertical',
                                                        WebkitLineClamp: 1,
                                                    }}>
                                                        {props.user.fullName}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '50px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        PaperProps={{
                                            elevation: 0,
                                            sx: {
                                                overflow: 'visible',
                                                width: '250px',
                                                textAlign: 'center',
                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                mt: 1.5,
                                                '&:before': {
                                                    content: '""',
                                                    display: 'block',
                                                    position: 'absolute',
                                                    top: 0,
                                                    right: 14,
                                                    width: 10,
                                                    height: 10,
                                                    bgcolor: 'background.paper',
                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                    zIndex: 0,
                                                },
                                            },
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        <MenuItem key='View Details' onClick={handleOpen}>
                                            <ListItemText>View Details</ListItemText>
                                        </MenuItem>
                                        <MenuItem key='Logout' onClick={handleLogout}>
                                            <ListItemText>Logout</ListItemText>
                                        </MenuItem>
                                    </Menu>
                                </Box>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </Container>
            </AppBar>
            <ProfileModal user={props.user} open={open} handleClose={handleClose} />
            <AccommodationModal user={props.user} open={accommodationOpen} handleClose={handleAccommodationClose} />
        </div>
    )
}

export default HostNavigation