import React, { useEffect, useState, useReducer } from 'react';
import { useDropzone } from 'react-dropzone';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import roLocale from 'date-fns/locale/ro';
import { ToastContainer, toast } from 'react-toastify';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import "../styles.css"
import { accommodationService } from "../services/accommodation.service"

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,

};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden',
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%',
};

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#ffdb57'
        }
    },
});

const EditAccomodationModal = (props) => {
    const [city, setCity] = React.useState(props.item.accommodation.city);
    const [people, setPeople] = React.useState(props.item.accommodation.maxPeople);
    const [address, setAddress] = React.useState(props.item.accommodation.address);
    const [dateFrom, setDateFrom] = React.useState(props.item.accommodation.startDate);
    const [dateTo, setDateTo] = React.useState(props.item.accommodation.endDate);
    const [description, setDescription] = React.useState(props.item.accommodation.description);
    const [files, setFiles] = useState([...props.item.accommodation.images]);
    const [tempFiles, setTempFiles] = useState(files)
    // eslint-disable-next-line
    const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            acceptedFiles.map(file => Object.assign(file, {
                content: URL.createObjectURL(file)
            }))

            solveBase64(acceptedFiles)
                .then(async imagesArray => {
                    const oldFiles = files
                    oldFiles.push(...imagesArray)
                    setTempFiles(oldFiles);
                    forceUpdate();
                })
        }
    });

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
        // eslint-disable-next-line
    }, []);

    const Thumbs = (files) => files.files.map(file => (
        <div style={thumb} key={file.content}>
            <div style={thumbInner}>
                <img
                    src={file.content}
                    style={img}
                    alt="images"
                    // Revoke data uri after image is loaded
                    onLoad={() => { URL.revokeObjectURL(file.content) }}
                />
            </div>
        </div>
    ));

    const getBase64 = file => {
        return new Promise(resolve => {
            let baseURL = "";
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                baseURL = reader.result;
                resolve(baseURL);
            };
        });
    };

    async function solveBase64(imageArray) {
        const result = imageArray.map(async (file) => {
            const base64file = await getBase64(file)
            return { content: base64file }
        });
        return await Promise.all(result)
    }

    const addAccommodation = () => {
        accommodationService.updateAccommodation(address, city, description, people, dateFrom, dateTo, tempFiles, props.item.id, props.item.available)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    toast.success("Successfully added accommodation!");
                    setFiles(() => tempFiles)
                    window.location.reload()
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                toast.error("There was an error!")
            });
        props.handleClose()
    }

    const handleCityChange = (e) => {
        setCity(e.target.value)
    }

    const handleAddressChange = (e) => {
        setAddress(e.target.value)
    }

    const handlePeopleChange = (e) => {
        setPeople(e.target.value)
    }

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1400,
        height: 700,
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
                        <Grid container
                            justifyContent="center"
                            style={{ minHeight: '700px' }}
                        >
                            <Grid item xs={12}>
                                <div style={{ padding: '20px', textAlign: 'center' }}>
                                    <Typography variant="h3">
                                        Edit Accommodation
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={7} sx={{ mt: 6 }}>
                                <Grid
                                    container
                                    justifyContent="center"
                                    style={{ minHeight: '550px' }}
                                    columnSpacing={{ xs: 6, sm: 6, md: 6 }}
                                >
                                    <Grid item xs={5}>
                                        <Typography variant="h5">
                                            City
                                        </Typography>
                                        <TextField
                                            className='inputRounded'
                                            sx={{ pt: 2, width: '35ch' }}
                                            id="city"
                                            value={city}
                                            placeholder='Enter the city'
                                            variant="standard"
                                            onChange={handleCityChange}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography variant="h5">
                                            Number of people
                                        </Typography>
                                        <TextField
                                            className='inputRounded'
                                            sx={{ pt: 2, width: '35ch' }}
                                            id="people"
                                            type="number"
                                            value={people}
                                            placeholder='Enter the number of people'
                                            InputProps={{
                                                endAdornment: <InputAdornment position="start">People</InputAdornment>,
                                            }}
                                            variant="standard"
                                            onChange={handlePeopleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography variant="h5">
                                            Address
                                        </Typography>
                                        <TextField
                                            className='inputRounded'
                                            sx={{ pt: 2, width: '35ch' }}
                                            id="address"
                                            placeholder='Enter the address'
                                            variant="standard"
                                            value={address}
                                            onChange={handleAddressChange}
                                        />
                                    </Grid>
                                    <Grid item xs={5}>
                                        <Typography variant="h5">
                                            Date
                                        </Typography>
                                        <LocalizationProvider dateAdapter={AdapterDateFns} locale={roLocale}>
                                            <DatePicker
                                                value={dateFrom}
                                                mask='__.__.____'
                                                onChange={(newValue) => {
                                                    setDateFrom(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params}
                                                    sx={{ pt: 2, pr: 1, width: '16ch' }}
                                                    id="standard-read-only-input"
                                                    variant="standard"
                                                    helperText="From"
                                                />}
                                            />
                                            <DatePicker
                                                value={dateTo}
                                                mask='__.__.____'
                                                onChange={(newValue) => {
                                                    setDateTo(newValue);
                                                }}
                                                renderInput={(params) => <TextField {...params}
                                                    sx={{ pt: 2, pl: 1, width: '16ch' }}
                                                    id="standard-read-only-input"
                                                    variant="standard"
                                                    helperText="To"
                                                />}
                                            />
                                        </LocalizationProvider>
                                    </Grid>
                                    <Grid item xs={12} sx={{ ml: 9 }}>
                                        <Typography variant="h5">
                                            Description
                                        </Typography>
                                        <TextField
                                            className='inputRounded'
                                            sx={{ pt: 2, width: '77ch' }}
                                            id="description"
                                            multiline
                                            placeholder='Enter the description'
                                            rows={3}
                                            variant="standard"
                                            value={description}
                                            onChange={handleDescriptionChange}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={5}>
                                <Grid
                                    container
                                    alignItems="center"
                                    justifyContent="center"
                                    style={{ minHeight: '700px' }}
                                    rowSpacing={1}
                                    columnSpacing={{ xs: 3, sm: 3, md: 3 }}
                                >
                                    <Grid item xs={12} sx={{ textAlign: 'center', fontSize: 20 }}>
                                        <section className="container">
                                            <div {...getRootProps({ className: 'dropzone' })}>
                                                <input {...getInputProps()} />
                                                <p>Drag 'n' drop some files here, or click to select files</p>
                                            </div>
                                            <aside style={thumbsContainer}>
                                                <Thumbs files={tempFiles} />
                                            </aside>
                                        </section>
                                    </Grid>

                                    <Grid item xs={6}>
                                        <div style={{ paddingTop: '20px', paddingLeft: '30px' }}>
                                            <ThemeProvider theme={buttonTheme}>
                                                <Button
                                                    title="Save"
                                                    variant="contained"
                                                    className='rounded-button'
                                                    fullWidth
                                                    onClick={addAccommodation} >
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
                            </Grid>
                        </Grid>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}

export default EditAccomodationModal