import * as React from 'react';
import { Component } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { userService } from '../services/user.service';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import CardMedia from '@mui/material/CardMedia';
import "../styles.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#ffdb57'
        }
    },
});


export class RegisterForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            fullName: "",
            phoneNumber: "",
            userRole: "",
            showPassword: false,
            hostColor: 'white',
            refugeeColor: 'white'

        }
    }

    setEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    setPassword = (e) => {
        this.setState({ password: e.target.value });
    }

    setName = (e) => {
        this.setState({ fullName: e.target.value });
    }

    setPhone = (e) => {
        this.setState({ phoneNumber: e.target.value });
    }

    setTypeHost = (e) => {
        this.setState({ userRole: "HOST", hostColor: '#C7FFA0', refugeeColor: 'white' });
        console.log(this.state.userRole)
    }

    setTypeRefugee = (e) => {
        this.setState({ userRole: "REFUGEE", hostColor: 'white', refugeeColor: '#C7FFA0' });
        console.log(this.state.userRole)
    }

    registerCall = () => {
        userService.register(this.state.email, this.state.password, this.state.fullName, this.state.phoneNumber, this.state.userRole)
            .then(async response => {
                const isJson = response.headers.get('content-type')?.includes('application/json');
                const data = isJson && await response.json();

                // check for error response
                if (!response.ok) {
                    // get error message from body or default to response status
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    this.props.navigate('/login', { state: { success: true } })
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                toast.error("There was an error!")
            });
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {

        return (
            <div className='bg'>
                <div className='form-register'>
                    <ToastContainer />
                    <Box
                        component="form"
                        sx={{

                            width: 400,
                            height: 675,
                            border: 1,
                            borderRadius: '16px',
                            borderColor: 'grey.300',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '20px',
                            backgroundColor: 'white'
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <Grid
                            container
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '500px' }}
                            rowSpacing={1}
                            columnSpacing={{ xs: 4, sm: 4, md: 4 }}
                        >

                            <Grid item xs={12}>
                                <div style={{ padding: '20px' }}>
                                    <Typography variant="h3">
                                        Register
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ paddingBottom: '20px' }}>
                                    <Card className='rounded-card' sx={{ backgroundColor: this.state.hostColor }}>
                                        <CardActionArea onClick={this.setTypeHost}>
                                            <CardMedia
                                                component="img"
                                                height="120"
                                                image={require('../static/images/cards/host.jpeg')}
                                                alt="I offer help"
                                            />
                                            <CardContent sx={{ height: '20px', mt: -2, mb: -1.5 }}>
                                                <Typography>I offer help</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            </Grid>
                            <Grid item xs={5}>
                                <div style={{ paddingBottom: '20px' }}>
                                    <Card className='rounded-card' sx={{ backgroundColor: this.state.refugeeColor }}>
                                        <CardActionArea onClick={this.setTypeRefugee}>
                                            <CardMedia
                                                component="img"
                                                height="120"
                                                image={require('../static/images/cards/refugee.jpeg')}
                                                alt="I need help"
                                            />
                                            <CardContent sx={{ height: '20px', mt: -2, mb: -1.5 }}>
                                                <Typography>I need help</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </div>
                            </Grid>
                            <Grid item>
                                <TextField
                                    className='inputRounded'
                                    sx={{ m: 1, width: '40ch' }}
                                    id="name"
                                    label="Your name"
                                    variant="outlined"
                                    onChange={this.setName}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className='inputRounded'
                                    sx={{ m: 1, width: '40ch' }}
                                    id="phone"
                                    label="Phone number"
                                    variant="outlined"
                                    type="phone"
                                    onChange={this.setPhone}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    className='inputRounded'
                                    sx={{ m: 1, width: '40ch' }}
                                    id="email"
                                    label="Email address"
                                    variant="outlined"
                                    type="email"
                                    onChange={this.setEmail}
                                />
                            </Grid>
                            <Grid item>
                                <FormControl className='inputRounded' sx={{ m: 1, width: '40ch' }} variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                                    <OutlinedInput
                                        id="password"
                                        label="Password"
                                        variant="outlined"
                                        type={this.state.showPassword ? 'text' : 'password'}
                                        onChange={this.setPassword}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={this.handleClickShowPassword}
                                                    onMouseDown={this.handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <div style={{ paddingTop: '20px' }}>
                                    <ThemeProvider theme={buttonTheme}>
                                        <Button
                                            title="Register"
                                            variant="contained"
                                            fullWidth
                                            className='large-button'
                                            onClick={this.registerCall} >
                                            Register
                                        </Button>
                                    </ThemeProvider>
                                </div>
                            </Grid>
                            <Grid item>
                                <Typography sx={{ color: '#464646', fontSize: 13, }}>Already have an account? <a href='/login'>Sign in here</a></Typography>
                            </Grid>
                        </Grid>
                    </Box>
                </div>
            </div >
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    return <RegisterForm {...props} navigate={navigate} />
}

export default WithNavigate