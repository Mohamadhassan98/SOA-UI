import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Profile from "../components/ProfileNavBar";
import '../App.css';
import CompanyCardView from "../components/CompanyCardView";

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser
        };
    }
}


export default function HomePage() {
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
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <CompanyCardView companyName={'Shaina'}
                                                 imageSource={'http://shainaco.com/wp-content/uploads/2016/12/Banner_Shaina_LogoNew.png'}
                                                 pk={card}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}