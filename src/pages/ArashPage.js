import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Profile from "../components/ProfileNavBar";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ArashCardView from "../components/ArashCardView";

const cards = [1, 2];
export default function ArashPage(props) {
    const pk = props.match.params.pk;
    return (
        <React.Fragment>
            <CssBaseline/>
            <Profile emailAddress='emohamadhassan@gmail.com'
                     firstName='Mohamad'
                     lastName='Ebrahimi'
                     isMaster={true}/>
            <main className='ArashPageMain'>
                <Container maxWidth='sm'>
                    <div>
                        <img alt='company-desc' className='DescImage'
                             src={pk === '1' ? 'http://avayezendegi.com/public/userfiles/images/avayezendegi/1393/11/18/10672/avayezendegi_biography_003.jpg' : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsIxP4WMYZK1cdE4CU2Dp8fX60M72-BokYNY_sM5bqim_Do3hqog'}/>
                    </div>
                </Container>
                <Container maxWidth='md'>
                    <div className='heroButtons'>
                        <Grid container spacing={1}>
                            <Grid item>
                                <Button variant="contained" color="primary" href={'/company/' + pk + '/add-arash'}>
                                    Add new Arash
                                </Button>
                            </Grid>
                        </Grid>
                    </div>
                </Container>
                <Container className='cardGrid' maxWidth="md">
                    <Grid container spacing={4}>
                        {cards.map(card => (
                            <Grid item key={card} xs={12} sm={6} md={4}>
                                <ArashCardView companyName={'Shaina'}
                                               imageSource={'http://shainaco.com/wp-content/uploads/2016/12/Banner_Shaina_LogoNew.png'}
                                               pk={pk}
                                               apk={card}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </main>
        </React.Fragment>
    );
}