import * as React from 'react';
import { Component } from 'react';
import Box from '@mui/material/Box';
// eslint-disable-next-line
import { app } from '../firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate, useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import "../styles.css";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: '#ffdb57'
        }
    },
});

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            mounted: false,
            showPassword: false
        }
    }

    componentDidMount() {
        if (this.props.params.state !== null) {
            if (this.props.params.state.success) {
                this.setState({ mounted: true });
            }
        }
    }

    setEmail = (e) => {
        this.setState({ email: e.target.value });
    }

    setPassword = (e) => {
        this.setState({ password: e.target.value });
    }

    handleAction = () => {
        const authentication = getAuth();
        signInWithEmailAndPassword(authentication, this.state.email, this.state.password)
            .then((response) => {
                console.log(response)
                this.props.navigate('/');
                sessionStorage.setItem('Auth Token', response._tokenResponse.idToken)
            })
            .catch((error) => {
                if (error.code === 'auth/wrong-password') {
                    toast.error('Wrong email or password!');
                }
                if (error.code === 'auth/invalid-email') {
                    toast.error('Please enter a valid email!');
                }
            })
    }

    redirectToRegister = () => {
        this.props.navigate('/register');
    }

    showToast() {
        const { mounted } = this.state;
        if (mounted === true) {
            return toast.success("Successfully registered!");
        }
        return;
    }

    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    render() {
        this.showToast()
        // eslint-disable-next-line
        this.state.mounted = false;
        return (
            <div className='bg'>
                <div className='form'>

                    <ToastContainer />
                    <Box
                        component="form"
                        sx={{

                            width: 400,
                            height: 550,
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
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{ minHeight: '500px' }}
                            rowSpacing={2}
                            columnSpacing={{ xs: 12, sm: 12, md: 12 }}
                        >

                            <Grid item>
                                <div style={{ padding: '40px' }}>
                                    <Typography variant="h3">
                                        Login
                                    </Typography>
                                </div>
                            </Grid>


                            <Grid item>
                                <TextField
                                    className='inputRounded'
                                    sx={{ m: 1, width: '40ch' }}
                                    id="email"
                                    label="Email adress"
                                    variant="outlined"
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
                                <div style={{ padding: '20px' }}>
                                    <ThemeProvider theme={buttonTheme}>
                                        <Button
                                            variant="contained"
                                            className='large-button'
                                            fullWidth
                                            title="Login"
                                            onClick={this.handleAction} >
                                            Login
                                        </Button>
                                    </ThemeProvider>
                                </div>
                            </Grid>

                            <Divider sx={{ m: 1, width: '40ch', paddingLeft: '95px' }}>or</Divider>

                            <Grid item>
                                <div style={{ padding: '10px' }}>
                                    <ThemeProvider theme={buttonTheme}>
                                        <Button
                                            variant="contained"
                                            className='large-button'
                                            fullWidth
                                            title="Create an account"
                                            onClick={this.redirectToRegister} >
                                            Create an account
                                        </Button>
                                    </ThemeProvider>
                                </div>
                            </Grid>
                        </Grid>
                    </Box>
                </div >
            </div>
        );
    }
}

function WithNavigate(props) {
    let navigate = useNavigate();
    let params = useLocation();
    return <Login {...props} navigate={navigate} params={params} />
}

export default WithNavigate