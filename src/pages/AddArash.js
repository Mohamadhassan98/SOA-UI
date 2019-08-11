import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../styles/AddArash.css';
import {StylesProvider} from '@material-ui/styles';
import DateFnsUtils from '@date-io/date-fns';
import {KeyboardDatePicker, MuiPickersUtilsProvider,} from '@material-ui/pickers';
import axios from "axios";
import {compareDates, getDateString} from '../Globals';


export default class AddArash extends React.Component {
    frontErrors = {
        publicKey: 'Public key cannot be empty',
        serialNumber: 'Serial number cannot be empty',
        license: 'License cannot be empty',
        version: 'Version cannot be empty',
        expireDate: 'Arash is already expired',
        purchaseDate: 'Arash is not purchased yet'
    };

    constructor(props) {
        super(props);
        this.pk = props.match.params.pk;
        this.state = {
            publicKey: '',
            serialNumber: '',
            license: '',
            expireDate: getDateString('/'),
            version: '',
            purchaseDate: getDateString('/'),
            publicKeyError: false,
            serialNumberError: false,
            licenseError: false,
            expireDateError: false,
            versionError: false,
            purchaseDateError: false,
            publicKeyHelper: ' ',
            serialNumberHelper: ' ',
            licenseHelper: ' ',
            expireDateHelper: ' ',
            versionHelper: ' ',
            purchaseDateHelper: ' '
        };
    }

    validateData = () => {
        let invalidData = false;
        if (this.state.publicKey.trim() === '') {
            this.setState({
                publicKeyError: true,
                publicKeyHelper: this.frontErrors.publicKey
            });
            invalidData = true;
        }
        if (this.state.serialNumber.trim() === '') {
            this.setState({
                serialNumberError: true,
                serialNumberHelper: this.frontErrors.serialNumber
            });
            invalidData = true;
        }
        if (this.state.license.trim() === '') {
            this.setState({
                licenseError: true,
                licenseHelper: this.frontErrors.license
            });
            invalidData = true;
        }
        if (this.state.version.trim() === '') {
            this.setState({
                versionError: true,
                versionHelper: this.frontErrors.version
            });
            invalidData = true;
        }
        if (compareDates(this.state.expireDate, getDateString('/')) === -1) {
            this.setState({
                expireDateError: true,
                expireDateHelper: this.frontErrors.expireDate
            });
            invalidData = true;
        }
        if (compareDates(this.state.purchaseDate, getDateString('/')) === 1) {
            this.setState({
                purchaseDateError: true,
                purchaseDateHelper: this.frontErrors.purchaseDate
            });
            invalidData = true;
        }
        return invalidData;
    };

    submitHandle = (e) => {
        e.preventDefault();
        if (!this.validateData()) {
            const url = 'http://127.0.0.1:8000/add/arash/';
            const data = {
                public_key: this.state.publicKey,
                serial_number: this.state.serialNumber,
                license: this.state.license,
                expire_date: this.state.expireDate.toString().replace(/\//g, '-'),
                version: this.state.version,
                purchase_date: this.state.purchaseDate.toString().replace(/\//g, '-'),
                company: this.pk
            };
            const redirectPath = '/home/' + this.pk;
            axios.post(url, data)
                .then(response =>
                    this.props.history.push(redirectPath))
                .catch(e => {
                    switch (e.response.status) {
                        case 400:
                            console.error(e.response.status);
                            this.handleErrors(e.response.data);
                            break;
                        default:
                        //TODO("Error pages")
                    }
                });
        }
    };

    handleErrors = (errors) => {
        for (let [key, value] of Object.entries(errors)) {
            switch (key) {
                case 'public_key':
                    this.setState({
                        publicKeyError: true,
                        publicKeyHelper: value
                    });
                    break;
                case 'serial_number':
                    this.setState({
                        serialNumberError: true,
                        serialNumberHelper: value
                    });
                    break;
                case 'license':
                    this.setState({
                        licenseError: true,
                        licenseHelper: value
                    });
                    break;
                case 'expire_date':
                    this.setState({
                        expireDateError: true,
                        expireDateHelper: value
                    });
                    break;
                case 'version':
                    this.setState({
                        versionError: true,
                        versionHelper: value
                    });
                    break;
                case 'purchase_date':
                    this.setState({
                        purchaseDateError: true,
                        purchaseDateHelper: value
                    });
                    break;
            }
        }
    };

    fieldChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    errorOff = () => {
        this.setState({
            publicKeyError: false,
            serialNumberError: false,
            licenseError: false,
            expireDateError: false,
            versionError: false,
            purchaseDateError: false,
            publicKeyHelper: ' ',
            serialNumberHelper: ' ',
            licenseHelper: ' ',
            expireDateHelper: ' ',
            versionHelper: ' ',
            purchaseDateHelper: ' ',
        });
    };

    expireDateChange = (e, value) => {
        this.setState({
            expireDate: value
        })
    };

    purchaseDateChange = (e, value) => {
        this.setState({
            purchaseDate: value
        })
    };

    render() {
        return (
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <StylesProvider injectFirst>
                    <React.Fragment>
                        <CssBaseline/>
                        <Profile emailAddress='emohamadhassan@gmail.com' lastName='Ebrahimi' firstName='Mohamad'/>
                        <main className='HomePageMain'>
                            <Container component="main" maxWidth="xs">
                                <CssBaseline/>
                                <div className='paper'>
                                    <Typography component="h1" variant="h5">
                                        Add Arash
                                    </Typography>
                                    <form className='form'>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    name="publicKey"
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="publicKey"
                                                    label="Public Key"
                                                    autoFocus
                                                    onChange={this.fieldChange}
                                                    error={this.state.publicKeyError}
                                                    helperText={this.state.publicKeyHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="serialNumber"
                                                    label="Serial Number"
                                                    name="serialNumber"
                                                    onChange={this.fieldChange}
                                                    error={this.state.serialNumberError}
                                                    helperText={this.state.serialNumberHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="license"
                                                    label="License"
                                                    name="license"
                                                    onChange={this.fieldChange}
                                                    error={this.state.licenseError}
                                                    helperText={this.state.licenseHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    fullWidth
                                                    variant="outlined"
                                                    format="yyyy/MM/dd"
                                                    margin="normal"
                                                    id="expireDate"
                                                    label="Expire Date"
                                                    defaultValue={getDateString('/')}
                                                    value={this.state.expireDate}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    onChange={this.expireDateChange}
                                                    error={this.state.expireDateError}
                                                    name='expireDate'
                                                    helperText={this.state.expireDateHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <TextField
                                                    variant="outlined"
                                                    required
                                                    fullWidth
                                                    id="version"
                                                    label="Version"
                                                    name="version"
                                                    onChange={this.fieldChange}
                                                    error={this.state.versionError}
                                                    helperText={this.state.versionHelper}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <KeyboardDatePicker
                                                    disableToolbar
                                                    fullWidth
                                                    variant="outlined"
                                                    format="yyyy/MM/dd"
                                                    margin="normal"
                                                    id="purchaseDate"
                                                    label="Purchase Date"
                                                    defaultValue={getDateString('/')}
                                                    value={this.state.purchaseDate}
                                                    KeyboardButtonProps={{
                                                        'aria-label': 'change date',
                                                    }}
                                                    onChange={this.purchaseDateChange}
                                                    name='purchaseDate'
                                                    error={this.state.purchaseDateError}
                                                    helperText={this.state.purchaseDateHelper}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            className='submit'
                                            // href={'/company/' + this.pk}
                                            onClick={this.submitHandle}
                                            onBlur={this.errorOff}
                                        >
                                            Save
                                        </Button>
                                    </form>
                                </div>
                            </Container>
                        </main>
                    </React.Fragment>
                </StylesProvider>
            </MuiPickersUtilsProvider>
        );
    }
}