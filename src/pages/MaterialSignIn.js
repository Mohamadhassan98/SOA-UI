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
import axios from 'axios';


//TODO("Change to stateful, handle validations, etc...")

export default class MaterialSignIn extends React.Component {

    frontErrors = {
        username: 'Username cannot be empty',
        password: 'Password cannot be empty'
    };

    constructor(props) {
        super(props);
        this.state = {
            isVisible: false,
            username: '',
            password: '',
            usernameError: false,
            passwordError: false,
            usernameHelper: ' ',
            passwordHelper: ' '
        };
    }

    handleClickShowPassword = () => {
        this.setState({isVisible: !this.state.isVisible});
    };

    validateData = () => {
        let invalidData = false;
        if (this.state.username.trim() === '') {
            this.setState({
                usernameError: true,
                usernameHelper: this.frontErrors.username
            });
            invalidData = true;
        }
        if (this.state.password.trim() === '') {
            this.setState({
                passwordError: true,
                passwordHelper: this.frontErrors.password
            });
        }
        return !invalidData;
    };

    submitHandle = (e) => {
        e.preventDefault();
        if (this.validateData()) {
            //Assuming there is username and password in states...
            const url = 'http://127.0.0.1:8000/accounts/login/';
            axios.post(url, {
                username: this.state.username,
                password: this.state.password
            }).then(response => {
                const csrftoken = response.headers.csrftoken;
                const sessionId = response.headers.sessionid;
                this.props.history.push({
                    pathname: '/home',
                    state: {
                        user: response.data,
                        csrftoken: csrftoken,
                        sessionId: sessionId
                    }
                });
            });
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    errorOff = () => {
        this.setState({
            usernameError: false,
            usernameHelper: ' ',
            passwordError: false,
            passwordHelper: ' '
        });
    };

    render() {
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
                                                helperText={this.state.usernameHelper}
                                                error={this.state.usernameError}
                                                onChange={this.onChange}
                                                value={this.state.username}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="password"
                                                name='password'
                                                variant="outlined"
                                                type={this.state.isVisible ? 'text' : 'password'}
                                                label="Password"
                                                fullWidth
                                                error={this.state.passwordError}
                                                helperText={this.state.passwordHelper}
                                                onChange={this.onChange}
                                                value={this.state.password}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="toggle password visibility"
                                                                onClick={this.handleClickShowPassword}
                                                                // onMouseDown={handleMouseDownPassword}
                                                            >
                                                                {this.state.isVisible ? <Visibility/> :
                                                                    <VisibilityOff/>}
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
                                        onClick={this.submitHandle}
                                        onBlur={this.errorOff}
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
}
