import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../App.css';
import CompanyCardView from "../components/CompanyCardView";
// import getCookie from "../components/CSRFToken";
import axios from 'axios';
import Typography from "@material-ui/core/Typography";

export default class HomePage extends React.Component {
    user = this.props.location.state.user;

    constructor(props) {
        super(props);
        this.csrftoken = this.props.location.state.csrftoken;
        this.sessionId = this.props.location.state.sessionId;
        this.state = {
            companies: []
        };
    }

    componentDidMount() {
        axios.defaults.withCredentials = true;
        const url = 'http://127.0.0.1:8000/companies';
        const config = {
            headers: {
                'X-CSRFToken': this.csrftoken,
                // Authorization: `Bearer ${this.sessionId}`,
                // 'Cookie': 'sessionid=' + this.sessionId
            }
        };
        axios.get(url, config).then(response => {
            this.setState({
                companies: response.data.companies
            })
        }).catch(error => console.error(error)); //TODO("Errors are welcomed")
        // try {
        //     const res = await fetch(, {
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json',
        //             'X-CSRFToken': this.csrftoken
        //         }
        //     });
        //     const companies = await res.json();
        //     this.setState({
        //         companies
        //     });
        // } catch (e) {
        //     console.log(e);
        // }

    }

    render() {
        console.log(this.state.companies);
        return (
            <React.Fragment>
                <CssBaseline/>
                <Profile emailAddress={this.user.email}
                         firstName={this.user.first_name}
                         lastName={this.user.last_name}
                         isMaster={this.user.status === 'ma'}/>
                <main className='HomePageMain'>
                    <Container maxWidth='md'>
                        <div className='heroButtons'>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Button variant="contained" color="primary" href='/company/add'>
                                        Add new Company
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    </Container>
                    <Container className='cardGrid' maxWidth="md">
                        {this.state.companies.length === 0 ? (
                            <Grid container spacing={4}>
                                {this.state.companies.map(company => (
                                    <Grid item key={company.id} xs={12} sm={6} md={4}>
                                        <CompanyCardView companyName={company.name}
                                                         imageSource={'http://shainaco.com/wp-content/uploads/2016/12/Banner_Shaina_LogoNew.png'}
                                                         pk={company.id}
                                                         email={company.email}/>
                                    </Grid>
                                ))}
                            </Grid>
                        ) : (
                            <Typography variant="h5" align="center" color="black" paragraph>
                                No company to show!
                            </Typography>
                        )}
                    </Container>
                </main>
            </React.Fragment>
        );
    }
}