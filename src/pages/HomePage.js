import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../App.css';
import CompanyCardView from "../components/CompanyCardView";
import getCookie from "../components/CSRFToken";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.csrftoken = getCookie('csrftoken');
        this.state = {
            companies: []
        };
    }


    async componentDidMount() {
        try {
            const res = await fetch('http://127.0.0.1:8000/companies', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': this.csrftoken
                }
            });
            const companies = await res.json();
            this.setState({
                companies
            });
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Profile emailAddress='emohamadhassan@gmail.com'
                         firstName='Mohamad'
                         lastName='Ebrahimi'
                         isMaster={true}/>
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
                    </Container>
                </main>
            </React.Fragment>
        );
    }

}