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


export default function EditArash(props) {

    const pk = props.match.params.pk;

    // const submitHandle = (e) => {
    //     e.preventDefault();
    // };

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
                                    Edit Arash
                                </Typography>
                                <form className='form' noValidate>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                                            <TextField
                                                autoComplete="publicKey"
                                                name="publicKey"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="publicKey"
                                                label="Public Key"
                                                autoFocus
                                                // className='MuiOutlinedInput-input'
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
                                                autoComplete="serialNumber"
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
                                                autoComplete="license"
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
                                                defaultValue={Date.now()}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
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
                                                autoComplete="version"
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
                                                defaultValue={Date.now()}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        href={'/company/' + pk}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        className='submit'
                                        // onClick={submitHandle}
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