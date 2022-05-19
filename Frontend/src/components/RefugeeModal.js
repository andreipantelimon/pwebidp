import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import roLocale from 'date-fns/locale/ro';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { accommodationService } from "../services/accommodation.service"
import { createTheme, ThemeProvider } from '@mui/material/styles';

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#ffdb57'
        }
    },
});

const RefugeeModal = (props) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1200,
        height: 800,
        border: 1,
        borderRadius: '16px',
        borderColor: 'grey.500',
        bgcolor: 'background.paper',
        padding: '20px',
        boxShadow: 24
    }

    const [dateFrom, setDateFrom] = React.useState()
    const [dateTo, setDateTo] = React.useState()
    const [guests, setGuests] = React.useState()

    const handleGuestsChange = (e) => {
        setGuests(e.target.value)
    }

    const reserveAccommodation = () => {
        accommodationService.setReservation(props.item.id, guests, dateFrom, dateTo)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    window.location.reload()
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
        props.handleClose()
    }

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns} locale={roLocale}>
                <Modal
                    open={props.open}
                    onClose={props.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={props.open}>
                        <Box
                            component="form"
                            sx={style}
                            noValidate
                            autoComplete="off"
                        >
                            <Grid container
                                style={{ height: '800px', width: '1200px' }}
                            >
                                <Grid item xs={6} sx={{ mt: 2 }}>
                                    <Grid
                                        container
                                        style={{ height: '750px' }}
                                        columnSpacing={{ xs: 6, sm: 6, md: 6 }}
                                    >
                                        <Grid item xs={12} sx={{ mr: 5 }}>
                                            <Carousel infiniteLoop showThumbs={false}>
                                                {props.item.accommodation.images.map(image => (
                                                    <div key={image.id}>
                                                        <img src={image.content} alt="" height="300px" />
                                                    </div>
                                                ))}
                                            </Carousel>
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: 1 }}>
                                            <Typography sx={{
                                                fontSize: 14
                                            }}>
                                                Host
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: 18
                                            }}>
                                                {props.item.createdBy.fullName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: 1 }}>
                                            <Typography sx={{
                                                fontSize: 14,
                                                mb: 1
                                            }}>
                                                Host Details
                                            </Typography>
                                            <Typography sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 2,
                                                fontSize: 18
                                            }} >
                                                {props.item.createdBy.description}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: 1 }}>
                                            <Typography sx={{
                                                fontSize: 14
                                            }}>
                                                Address
                                            </Typography>
                                            <Typography sx={{
                                                fontSize: 18,
                                            }}>
                                                {props.item.accommodation.address}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sx={{ mt: 1, mr: 2 }}>
                                            <Typography sx={{
                                                fontSize: 14,
                                                mb: 1
                                            }}>
                                                Description
                                            </Typography>
                                            <Typography sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 5,
                                                fontSize: 18
                                            }} >
                                                {props.item.accommodation.description}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid
                                        container
                                        alignItems="flex-start"
                                        justifyContent="flex-start"
                                        style={{ minHeight: '725px' }}
                                        rowSpacing={1}
                                        columnSpacing={{ xs: 3, sm: 3, md: 3 }}
                                    >
                                        <Grid item xs={12} sx={{ textAlign: 'center', fontSize: 20 }}>

                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography variant="h7">
                                                Availability
                                            </Typography>
                                            <Typography variant="h5">
                                                Available: {props.item.accommodation.maxPeople - props.item.accommodation.currentPeople} / {props.item.accommodation.maxPeople}
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <Box sx={{
                                                width: 525,
                                                height: 510,
                                                backgroundColor: '#ebebeb',
                                                borderRadius: 5
                                            }}>
                                                <Grid
                                                    container
                                                    style={{ minHeight: '400px' }}
                                                    rowSpacing={1}
                                                    columnSpacing={{ xs: 3, sm: 3, md: 3 }}
                                                >
                                                    <Grid item xs={12} sx={{ ml: 3, mt: 2 }}>
                                                        <Typography variant="h5">
                                                            Contact Information
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sx={{ ml: 3, mt: 2 }}>
                                                        <Typography variant="h7">
                                                            Email
                                                        </Typography>
                                                        <Typography sx={{
                                                            display: '-webkit-box',
                                                            overflow: 'hidden',
                                                            WebkitBoxOrient: 'vertical',
                                                            WebkitLineClamp: 3
                                                        }}
                                                            variant="h5"
                                                        >
                                                            {props.item.createdBy.email}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sx={{ ml: 3, mt: 2 }}>
                                                        <Typography variant="h7">
                                                            Phone Number
                                                        </Typography>
                                                        <Typography variant="h5">
                                                            {props.item.createdBy.phone}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Divider sx={{ ml: 3, mt: 2, mb: 2, mr: 3 }} />
                                                    </Grid>
                                                    <Grid item xs={5} sx={{ ml: 3 }}>
                                                        <Typography variant="h7">
                                                            From
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={5} sx={{ ml: 3 }}>
                                                        <Typography variant="h7">
                                                            To
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={5} sx={{ ml: 3 }}>
                                                        <DatePicker
                                                            value={dateFrom}
                                                            mask='__.__.____'
                                                            onChange={(newValue) => {
                                                                setDateFrom(newValue);
                                                            }}
                                                            renderInput={(params) =>
                                                                <TextField {...params}
                                                                    sx={{ width: '24ch' }}
                                                                    className="inputRounded"
                                                                    InputProps={{
                                                                        style: {
                                                                            fontSize: 20
                                                                        },
                                                                        ...params.InputProps
                                                                    }}
                                                                    id="outlined-read-only-input"
                                                                    variant="outlined"
                                                                />}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5} sx={{ ml: 3 }}>
                                                        <DatePicker
                                                            value={dateTo}
                                                            mask='__.__.____'
                                                            onChange={(newValue) => {
                                                                setDateTo(newValue);
                                                            }}
                                                            renderInput={(params) => <TextField {...params}
                                                                sx={{ width: '24ch' }}
                                                                className="inputRounded"
                                                                InputProps={{
                                                                    style: {
                                                                        fontSize: 20
                                                                    },
                                                                    ...params.InputProps
                                                                }}
                                                                id="outlined-read-only-input"
                                                                variant="outlined"
                                                            />}
                                                        />
                                                    </Grid>

                                                    <Grid item xs={12} sx={{ ml: 3, mt: 2 }}>
                                                        <Typography variant="h7">
                                                            Number of guests
                                                        </Typography>

                                                    </Grid>
                                                    <Grid item xs={12} sx={{ ml: 3 }}>
                                                        <TextField
                                                            className='inputRounded'
                                                            sx={{ pt: 2, width: '24ch' }}
                                                            id="guests"
                                                            type="number"
                                                            placeholder='Number of guests'
                                                            variant="outlined"
                                                            onChange={handleGuestsChange}
                                                        />
                                                    </Grid>
                                                    <Grid item xs={5} sx={{ mt: 5, ml: 3 }}>
                                                        <div style={{ pl: 3 }}>
                                                            <ThemeProvider theme={buttonTheme}>
                                                                <Button
                                                                    sx={{ width: 200 }}
                                                                    title="Reserve"
                                                                    variant="contained"
                                                                    className='rounded-button'
                                                                    onClick={reserveAccommodation}
                                                                >
                                                                    Reserve
                                                                </Button>
                                                            </ThemeProvider>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={5} sx={{ mt: 5, ml: 5 }}>
                                                        <div style={{}}>
                                                            <ThemeProvider theme={buttonTheme}>
                                                                <Button
                                                                    sx={{ width: 200 }}
                                                                    title="Cancel"
                                                                    variant="contained"
                                                                    className='rounded-button'
                                                                    onClick={props.handleClose} >
                                                                    Cancel
                                                                </Button>
                                                            </ThemeProvider>
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>
                </Modal>
            </LocalizationProvider >
        </div >
    )
}

export default RefugeeModal