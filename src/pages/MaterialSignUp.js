import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import '../styles/MaterialSignUp.css';
import {StylesProvider} from '@material-ui/styles';


export default function SignUp(props) {
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        isVisible: false,
    });

    const handleClickShowPassword = () => {
        setValues({...values, isVisible: !values.isVisible});
    };

    const submitHandle = (e) => {
        e.preventDefault();
    };

    return (
        <StylesProvider injectFirst>
            <React.Fragment>
                <CssBaseline/>
                <Profile emailAddress='emohamadhassan@gmail.com' lastName='Ebrahimi' firstName='Mohamad'/>
                <main className='HomePageMain'>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className='paper'>
                            <Typography component="h1" variant="h5">
                                Sign up
                            </Typography>
                            <form className='form' noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="fname"
                                            name="firstName"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            autoFocus
                                            // className='MuiOutlinedInput-input'
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            name="lastName"
                                            autoComplete="lname"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            name="email"
                                            autoComplete="email"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="username"
                                            label="Username"
                                            name="username"
                                            autoComplete="username"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="mobilePhone"
                                            label="Phone number"
                                            name="mobilePhone"
                                            autoComplete="mobile"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="outlined-adornment-password"
                                            // className={clsx(classes.margin, classes.textField)}
                                            variant="outlined"
                                            type={values.isVisible ? 'text' : 'password'}
                                            label="Password"
                                            fullWidth
                                            // value=''
                                            // onChange={handleChange('password')}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            edge="end"
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            // onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {values.isVisible ? <Visibility/> : <VisibilityOff/>}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="inPlace" color="primary"/>}
                                            label="in place"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="personnelCode"
                                            label="Personnel Code"
                                            name="personnelCode"
                                            autoComplete="personnel"
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="master" color="primary"/>}
                                            label="is master"
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className='submit'
                                    onClick={submitHandle}
                                >
                                    Sign Up
                                </Button>
                            </form>
                        </div>
                    </Container>
                </main>
            </React.Fragment>
        </StylesProvider>
    );
}