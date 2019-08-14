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
import axios from "axios";
import {containsDigitOnly, isEmail} from "../Globals";
import AddressModal from "../components/AddressModal";


export default class SignUp extends React.Component {
    frontErrors = {
        firstName: 'First name cannot be empty',
        lastName: 'Last name cannot be empty',
        username: 'Username cannot be empty',
        email: ['Email cannot be empty', 'Email format is invalid. Example: \'example@mail.com\''],
        password: 'Password cannot be empty',
        passwordRepeat: `Password doesn't match`,
        mobilePhone: 'Mobile number must be exactly 11 characters',
        personnelCode: 'Personnel code cannot be empty'
    };

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
            mobilePhone: '',
            personnelCode: '',
            inPlace: false,
            address: {},
            status: 'ad',
            isVisiblePassword: false,
            isVisiblePasswordRepeat: false,
            firstNameError: false,
            lastNameError: false,
            usernameError: false,
            emailError: false,
            passwordError: false,
            passwordRepeatError: false,
            mobilePhoneError: false,
            personnelCodeError: false,
            firstNameHelper: ' ',
            lastNameHelper: ' ',
            usernameHelper: ' ',
            emailHelper: ' ',
            passwordHelper: ' ',
            passwordRepeatHelper: ' ',
            mobilePhoneHelper: ' ',
            personnelCodeHelper: ' ',
        };
    }

    errorOff = () => {
        this.setState({
            firstNameError: false,
            lastNameError: false,
            usernameError: false,
            emailError: false,
            passwordError: false,
            passwordRepeatError: false,
            mobilePhoneError: false,
            personnelCodeError: false,
            firstNameHelper: ' ',
            lastNameHelper: ' ',
            usernameHelper: ' ',
            emailHelper: ' ',
            passwordHelper: ' ',
            passwordRepeatHelper: ' ',
            mobilePhoneHelper: ' ',
            personnelCodeHelper: ' '
        });
    };

    validateData = () => {
        let invalidData = false;
        const {firstName, lastName, username, email, password, passwordRepeat, mobilePhone, personnelCode} = this.state;
        if (firstName.trim() === '') {
            this.setState({
                firstNameError: true,
                firstNameHelper: this.frontErrors.firstName
            });
            invalidData = true;
        }
        if (lastName.trim() === '') {
            this.setState({
                lastNameError: true,
                lastNameHelper: this.frontErrors.lastName
            });
            invalidData = true;
        }
        if (username.trim() === '') {
            this.setState({
                usernameError: true,
                usernameHelper: this.frontErrors.username
            });
            invalidData = true;
        }
        if (email.trim() === '') {
            this.setState({
                emailError: true,
                emailHelper: this.frontErrors.email[0]
            });
            invalidData = true;
        } else if (!isEmail(email)) {
            this.setState({
                emailError: true,
                emailHelper: this.frontErrors.email[1]
            });
            invalidData = true;
        }
        if (password.trim() === '') {
            this.setState({
                passwordError: true,
                passwordHelper: this.frontErrors.password
            });
            invalidData = true;
        }
        if (passwordRepeat.trim() !== password) {
            this.setState({
                passwordRepeatError: true,
                passwordRepeatHelper: this.frontErrors.passwordRepeat
            });
            invalidData = true;
        }
        if (mobilePhone.trim().length !== 11) {
            this.setState({
                mobilePhoneError: true,
                mobilePhoneHelper: this.frontErrors.mobilePhone
            });
            invalidData = true;
        }
        if (personnelCode.trim() === '') {
            this.setState({
                personnelCodeError: true,
                personnelCodeHelper: this.frontErrors.personnelCode
            });
            invalidData = true;
        }
        return !invalidData;
    };

    fieldChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    submitAddress = (address) => {
        this.setState({
            address: address
        });
    };

    maxFieldChange = (e, max, numeric = false) => {
        if (e.target.value.length <= max) {
            if (numeric) {
                this.numericFieldChange(e);
            } else {
                this.fieldChange(e);
            }
        }
    };

    numericFieldChange = (e) => {
        if (containsDigitOnly(e.target.value)) {
            this.fieldChange(e);
        }
    };

    handleClickShowPassword = () => {
        this.setState({isVisiblePassword: !this.state.isVisiblePassword});
    };

    handleClickShowPasswordRepeat = () => {
        this.setState({isVisiblePasswordRepeat: !this.state.isVisiblePasswordRepeat});
    };

    submitHandle = (e) => {
        e.preventDefault();
        // console.log(this.state);
        if (this.validateData()) {
            const url = 'http://127.0.0.1:8000/signup/';
            axios.post(url, {
                username: this.state.username,
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                password: this.state.password,
                email: this.state.email,
                phone: this.state.mobilePhone,
                personnel_code: this.state.personnelCode,
                in_place: this.state.inPlace,
                status: this.state.status,
                address: {
                    ...this.state.address,
                    postal_code: this.state.address.postalCode,
                    tel_phone: this.state.address.telephone
                }
            }).then(response => {
                console.log(this.state);
                const csrftoken = response.headers.csrftoken;
                // const sessionId = response.headers.sessionid;
                this.props.history.push({
                    pathname: '/history',
                    state: {
                        user: response.data,
                        csrftoken: csrftoken,
                        // sessionId: sessionId
                    }
                });
            }).catch(error => {
                console.error(error);
            });
        }
    };

    masterChanged = (e, checked) => {
        this.setState({
            status: checked ? 'ma' : 'ad'
        });
    };

    inPlaceChanged = (e, checked) => {
        this.setState({
            inPlace: checked
        });
    };

    render() {
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
                                                name="firstName"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                                autoFocus
                                                autoComplete='off'
                                                onChange={this.fieldChange}
                                                value={this.state.firstName}
                                                error={this.state.firstNameError}
                                                helperText={this.state.firstNameHelper}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete='off'
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="lastName"
                                                label="Last Name"
                                                name="lastName"
                                                onChange={this.fieldChange}
                                                value={this.state.lastName}
                                                error={this.state.lastNameError}
                                                helperText={this.state.lastNameHelper}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                autoComplete='off'
                                                required
                                                fullWidth
                                                id="email"
                                                label="Email Address"
                                                name="email"
                                                onChange={this.fieldChange}
                                                value={this.state.email}
                                                error={this.state.emailError}
                                                helperText={this.state.emailHelper}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                autoComplete='off'
                                                fullWidth
                                                id="username"
                                                label="Username"
                                                name="username"
                                                onChange={this.fieldChange}
                                                value={this.state.username}
                                                error={this.state.usernameError}
                                                helperText={this.state.usernameHelper}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                variant="outlined"
                                                required
                                                autoComplete='off'
                                                fullWidth
                                                id="mobilePhone"
                                                label="Phone number"
                                                name="mobilePhone"
                                                onChange={(e) => this.maxFieldChange(e, 11, true)}
                                                value={this.state.mobilePhone}
                                                error={this.state.mobilePhoneError}
                                                helperText={this.state.mobilePhoneHelper}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <AddressModal submitAddress={this.submitAddress}/>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="password"
                                                autoComplete='off'
                                                variant="outlined"
                                                type={this.state.isVisiblePassword ? 'text' : 'password'}
                                                label="Password"
                                                name="password"
                                                onChange={this.fieldChange}
                                                value={this.state.password}
                                                error={this.state.passwordError}
                                                helperText={this.state.passwordHelper}
                                                fullWidth
                                                required
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="toggle password visibility"
                                                                onClick={this.handleClickShowPassword}
                                                            >
                                                                {this.state.isVisiblePassword ? <Visibility/> :
                                                                    <VisibilityOff/>}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoComplete='off'
                                                id="passwordRepeat"
                                                variant="outlined"
                                                type={this.state.isVisiblePasswordRepeat ? 'text' : 'password'}
                                                label="Confirm Password"
                                                name="passwordRepeat"
                                                onChange={this.fieldChange}
                                                value={this.state.passwordRepeat}
                                                error={this.state.passwordRepeatError}
                                                helperText={this.state.passwordRepeatHelper}
                                                fullWidth
                                                required
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                edge="end"
                                                                aria-label="toggle password visibility"
                                                                onClick={this.handleClickShowPasswordRepeat}
                                                            >
                                                                {this.state.isVisiblePasswordRepeat ? <Visibility/> :
                                                                    <VisibilityOff/>}
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
                                                value={this.state.inPlace}
                                                onChange={this.inPlaceChanged}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoComplete='off'
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="personnelCode"
                                                label="Personnel Code"
                                                onChange={(e) => this.maxFieldChange(e, 15)}
                                                name="personnelCode"
                                                value={this.state.personnelCode}
                                                error={this.state.personnelCodeError}
                                                helperText={this.state.personnelCodeHelper}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox value="master" color="primary"/>}
                                                label="is master"
                                                value={this.state.status === 'ma'}
                                                onChange={this.masterChanged}
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
}