import React from 'react';
import '../unnamed.jpg';
import profile from '../unnamed.jpg';
import crown from '../crowns.png';
import Popup from "reactjs-popup";
import {AppBar} from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";


function ProfileNavBar(props) {
    const user = props.user;
    const goToProfile = () => {
        props.myHistory.push('/profile', {
            user: user
        });
    };

    const goToHistory = () => {
        props.history.push('/history', {
            user: user
        });
    };

    return (
        <div className='ProfileNB'>
            <label className='fullNameLabel'>{user.first_name + ' ' + user.last_name}</label>
            <label className='emailLabel'>{user.email}</label>
            <img className='profilePicture' src={profile} alt='ProfilePicture'/>
            {
                user.status === 'ma' &&
                <img src={crown} className='masterCrown' alt='MasterCrown'/>
            }
            <Button className='button profileButton' onClick={goToProfile}>
                Profile
            </Button>
            <Button className='button historyButton' onClick={goToHistory}>
                History
            </Button>
        </div>
    );
}

function Profile(props) {
    return (
        <AppBar className='AppBar' position="sticky">
            <Toolbar>
                <Popup
                    trigger={<img className='profilePictureTrigger' src={profile} alt='ProfilePictureTrigger'/>}
                    position='bottom right'
                    on='click'
                    contentStyle={{
                        position: 'absolute',
                        zIndex: '0',
                        width: '340px',
                        height: '260px',
                        background: "transparent",
                        border: "0px solid transparent",
                        boxShadow: "rgba(0, 0, 0, 0) 0px 0px 0px",
                        padding: '0px'
                    }}
                >
                    <ProfileNavBar
                        user={props.user}
                        myHistory={props.myHistory}/>
                </Popup>
            </Toolbar>
        </AppBar>
    )
}

Profile.propTypes = {
    myHistory: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default Profile;