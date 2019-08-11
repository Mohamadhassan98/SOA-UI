import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../styles/AddCompany.css';
import {StylesProvider} from '@material-ui/styles';


export default function EditCompany(props) {
    // const [values, setValues] = React.useState({
    //     amount: '',
    //     password: '',
    //     weight: '',
    //     weightRange: '',
    //     isVisible: false,
    // });

    // const handleClickShowPassword = () => {
    //     setValues({...values, isVisible: !values.isVisible});
    // };

    // const submitHandle = (e) => {
    //     e.preventDefault();
    // };

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
                                Edit Company
                            </Typography>
                            <form className='form' noValidate>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            autoComplete="name"
                                            name="name"
                                            variant="outlined"
                                            required
                                            fullWidth
                                            id="name"
                                            label="Company Name"
                                            autoFocus
                                            value='e.g. This cannot be changed!'
                                            // className='MuiOutlinedInput-input'
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
                                            defaultValue='Shaina@mail.co.ir'
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
                                    href={'/home'}
                                >
                                    Save
                                </Button>
                            </form>
                        </div>
                    </Container>
                </main>
            </React.Fragment>
        </StylesProvider>
    );
}