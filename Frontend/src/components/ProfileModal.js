import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import { createTheme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'

import "../styles.css"
import { userService } from '../services/user.service';

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#ffdb57'
        }
    },
});

const ProfileModal = (props) => {
    const [fullName, setName] = React.useState(props.user.fullName);
    const [phone, setPhone] = React.useState(props.user.phone);
    const [email, setEmail] = React.useState(props.user.email);
    const [description, setDescription] = React.useState(props.user.description);

    const saveProfile = () => {
        console.log(fullName, phone, email, description)
        userService.updateProfile(description, email, fullName, props.user.id, props.user.password, phone, props.user.userRole)
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
                toast.error("There was an error!")
            });
        props.handleClose()
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handlePhoneChange = (e) => {
        setPhone(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 420,
        height: 650,
        border: 1,
        borderRadius: '16px',
        borderColor: 'grey.500',
        bgcolor: 'background.paper',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        boxShadow: 24
    }

    return (
        <div>
            <ToastContainer />
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
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '500px' }}
                            rowSpacing={1}
                            columnSpacing={{ xs: 2, sm: 2, md: 2 }}
                        >

                            <Grid item xs={12}>
                                <div style={{ padding: '20px', textAlign: 'center' }}>
                                    <Typography variant="h3">
                                        Profile
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item>
                                <TextField
                                    className='inputRounded'
                                    sx={{ m: 1, width: '40ch' }}
                                    id="name"
                                    label="Your name"
                                    defaultValue={fullName}
                                    variant="outlined"
                                    onChange={handleNameChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className='inputRounded'
                                    sx={{ m: 1, width: '40ch' }}
                                    id="phone"
                                    label="Phone number"
                                    defaultValue={phone}
                                    variant="outlined"
                                    type="phone"
                                    onChange={handlePhoneChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className='inputRounded'
                                    sx={{ m: 1, width: '40ch' }}
                                    id="email"
                                    label="Email address"
                                    defaultValue={email}
                                    variant="outlined"
                                    type="email"
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className='inputRounded'
                                    sx={{ m: 1, width: '40ch' }}
                                    id="description"
                                    label="Description"
                                    defaultValue={description !== null ? description : ""}
                                    multiline
                                    rows={6}
                                    variant="outlined"
                                    onChange={handleDescriptionChange}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{ paddingTop: '20px', paddingLeft: '30px' }}>
                                    <ThemeProvider theme={buttonTheme}>
                                        <Button
                                            title="Save"
                                            variant="contained"
                                            className='rounded-button'
                                            fullWidth
                                            onClick={saveProfile} >
                                            Save
                                        </Button>
                                    </ThemeProvider>
                                </div>
                            </Grid>
                            <Grid item xs={6}>
                                <div style={{ paddingTop: '20px', paddingRight: '30px' }}>
                                    <ThemeProvider theme={buttonTheme}>
                                        <Button
                                            title="Cancel"
                                            variant="contained"
                                            className='rounded-button'
                                            fullWidth
                                            onClick={props.handleClose} >
                                            Cancel
                                        </Button>
                                    </ThemeProvider>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default ProfileModal