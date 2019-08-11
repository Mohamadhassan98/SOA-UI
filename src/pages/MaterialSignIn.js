import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import '../styles/MaterialSignIn.css';
import {StylesProvider} from '@material-ui/styles';


export default function MaterialSignIn(props) {
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

    // const submitHandle = (e) => {
    //     e.preventDefault();
    // };

    return (
        <StylesProvider injectFirst>
            <React.Fragment>
                <CssBaseline/>
                <main className='HomePageMain'>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline/>
                        <div className='paper'>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>
                            <form className='form' noValidate>
                                <Grid container spacing={2}>
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
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className='submit'
                                    // onClick={submitHandle}
                                    href='/home'
                                >
                                    Sign In
                                </Button>
                            </form>
                        </div>
                    </Container>
                </main>
            </React.Fragment>
        </StylesProvider>
    );
}