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
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { CardActionArea, Divider, ListItemText } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import roLocale from 'date-fns/locale/ro';
import Grid from '@mui/material/Grid';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'

import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';

import { useNavigate } from 'react-router-dom'
import ProfileModal from './ProfileModal';

const RefugeeNavigation = (props) => {
    let navigate = useNavigate();
    const drawerWidth = 350;

    const handleLogout = () => {
        sessionStorage.removeItem('Auth Token');
        navigate('/login')
    }
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [open, setOpen] = React.useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const refreshPage = () => {
        window.location.reload()
    }

    const buttonTheme = createTheme({
        palette: {
            primary: {
                main: '#ffdb57'
            }
        },
    });

    return (
        <div>

            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed"
                    sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: '#11296b' }}
                >
                    <Container maxWidth="xl">
                        <Toolbar disableGutters>
                            {/* Title */}
                            <Grid container alignItems={'center'}>
                                <Grid item xs={10}>
                                    <Typography
                                        variant="h6"
                                        noWrap
                                        component="div"
                                        sx={{ display: { xs: 'none', md: 'flex' } }}
                                        onClick={refreshPage}
                                    >
                                        BOOKING APP
                                    </Typography>
                                </Grid>

                                {/* User Profile */}
                                <Grid item xs={2}>
                                    <Box sx={{ flexGrow: 0 }}>
                                        <Tooltip title="Open settings">
                                            <Card onClick={handleOpenUserMenu} sx={{ width: '225px' }}>
                                                <CardActionArea>
                                                    <CardContent>
                                                        <Typography sx={{
                                                            display: '-webkit-box',
                                                            overflow: 'hidden',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 1,
                                                        }}>{props.user.fullName}</Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                            </Card>
                                        </Tooltip>
                                        <Menu
                                            sx={{ mt: '40px' }}
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
                                                    width: '225px',
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
                                            <MenuItem key='My Accomodations' onClick={props.myAccomodations}>
                                                <ListItemText>My Accomodations</ListItemText>
                                            </MenuItem>
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
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto', textAlign: 'center', pl: 2, pt: 5, pr: 2, pb: 5 }}>
                        <Typography variant="h5" sx={{ pb: 5 }}>
                            Filter Accommodation
                        </Typography>
                        <Divider sx={{ mb: 5 }} />
                        <div style={{ textAlign: 'left' }}>
                            <Typography variant="h5">
                                City
                            </Typography>
                            <TextField
                                className='inputRounded'
                                sx={{ pt: 2, width: '35ch', pb: 5 }}
                                id="city"
                                placeholder='Enter the city'
                                variant="standard"
                                onChange={props.handleCityChange}
                            />
                            <Typography variant="h5">
                                Number of people
                            </Typography>
                            <TextField
                                className='inputRounded'
                                sx={{ pt: 2, width: '35ch', pb: 5 }}
                                id="people"
                                type="number"
                                placeholder='Enter the number of people'
                                InputProps={{
                                    endAdornment: <InputAdornment position="start">People</InputAdornment>,
                                }}
                                variant="standard"
                                onChange={props.handlePeopleChange}
                            />
                            <Typography variant="h5">
                                Date
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns} locale={roLocale}>
                                <DatePicker
                                    value={props.dateFrom}
                                    mask='__.__.____'
                                    onChange={props.handleDateFromChange}
                                    renderInput={(params) => <TextField {...params}
                                        sx={{ pt: 2, pr: 1, width: '16ch' }}
                                        id="standard-read-only-input"
                                        variant="standard"
                                        helperText="From"
                                    />}
                                />
                                <DatePicker
                                    value={props.dateTo}
                                    mask='__.__.____'
                                    onChange={props.handleDateToChange}
                                    renderInput={(params) => <TextField {...params}
                                        sx={{ pt: 2, pl: 1, width: '16ch' }}
                                        id="standard-read-only-input"
                                        variant="standard"
                                        helperText="To"
                                    />}
                                />
                            </LocalizationProvider>
                            <FormControlLabel
                                control={<Checkbox />}
                                sx={{ pb: 7, pt: 2, '& .MuiSvgIcon-root': { fontSize: 25 } }}
                                label="I want to stay alone"
                                onChange={props.handleAloneChange}
                            />
                            <ThemeProvider theme={buttonTheme}>
                                <Button
                                    title="Cancel"
                                    variant="contained"
                                    className='filter-button'
                                    fullWidth
                                    onClick={props.handleFilter}
                                >
                                    Apply filters
                                </Button>
                            </ThemeProvider>
                        </div>
                    </Box>
                </Drawer>
            </Box >
            <ProfileModal user={props.user} open={open} handleClose={handleClose} />
        </div >
    )
}

export default RefugeeNavigation