import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { ToastContainer, toast } from 'react-toastify';
import "../styles.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { accommodationService } from '../services/accommodation.service';

const theme = createTheme({
    typography: {
        h6: {
            fontSize: 18,
            fontWeight: 400
        },
        h7: {
            fontSize: 14,
        },
        h3: {
            fontSize: 50,
            fontWeight: 200
        }
    },
});

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#ffdb57'
        }
    },
});

const AccomodationCard = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        accommodationService.deleteAccommodation(props.item.id)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    setOpen(false);
                    window.location.reload()
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                toast.error("There was an error!")
            });
    }

    return (
        <div style={{
            textAlign: 'left'
        }}>
            <ToastContainer />
            <ThemeProvider theme={theme}>
                <Card sx={{ maxWidth: 500 }}>
                    <CardMedia
                        component="img"
                        alt="img"
                        height="200"
                        image={props.item.accommodation.images[0]?.content !== undefined ? props.item.accommodation.images[0].content : 'https://i.imgur.com/znHeBZx.png'}
                    />
                    <CardContent>
                        <Grid container
                            style={{ height: '350px' }}
                            rowSpacing={1}
                        >
                            <Grid item xs={12}>
                                <Typography variant="h7">
                                    Host
                                </Typography>
                                <Typography variant="h6">
                                    {props.item.createdBy.fullName}
                                </Typography>
                            </Grid>
                            <Grid item xs={3} >
                                <Typography variant="h7">
                                    From
                                </Typography>
                                <Typography variant="h6">
                                    {props.item.accommodation.startDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={1} sx={{ ml: 1 }}>
                                <Typography variant="h3">
                                    -
                                </Typography>
                            </Grid>
                            <Grid item xs={3}>
                                <Typography variant="h7">
                                    To
                                </Typography>
                                <Typography variant="h6">
                                    {props.item.accommodation.endDate}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h7">
                                    Address
                                </Typography>
                                <Typography sx={{
                                    display: '-webkit-box',
                                    overflow: 'hidden',
                                    WebkitBoxOrient: 'vertical',
                                    WebkitLineClamp: 2,
                                }}
                                    variant="h6">
                                    {props.item.accommodation.address}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h7">
                                    Availability
                                </Typography>
                                <Typography variant="h6">
                                    Occupied: {props.item.accommodation.guests.length} / {props.item.accommodation.maxPeople}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h7">
                                    Description
                                </Typography>
                                <Typography
                                    sx={{
                                        display: '-webkit-box',
                                        overflow: 'hidden',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 2,
                                    }}
                                    variant="h6">
                                    {props.item.accommodation.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center' }}>
                        <ThemeProvider theme={buttonTheme}>
                            <Button
                                sx={{ mr: 10, mb: 2 }}
                                variant="contained"
                                className='card-button'
                                onClick={props.handleOpen}
                                size="small">Edit</Button>
                            <Button
                                sx={{ mb: 2 }}
                                variant="contained"
                                className='card-button'
                                onClick={handleClickOpen}
                                size="small">Delete</Button>
                        </ThemeProvider>
                    </CardActions>
                </Card>
            </ThemeProvider>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Delete accommondation?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure that you want to delete this accommodation? This action is ireversible!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}

export default AccomodationCard