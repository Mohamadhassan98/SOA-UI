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
    return (
        <div className='ProfileNB'>
            <label className='fullNameLabel'>{props.firstname + ' ' + props.lastname}</label>
            <label className='emailLabel'>{props.emailAddress}</label>
            <img className='profilePicture' src={profile} alt='ProfilePicture'/>
            {
                props.isMaster &&
                <img src={crown} className='masterCrown' alt='MasterCrown'/>
            }
            <Button className='button profileButton' href='pages/profile'>
                Profile
            </Button>
            <Button className='button historyButton' href='pages/history'>
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
                    <ProfileNavBar emailAddress={props.emailAddress} firstname={props.firstName}
                                   lastname={props.lastName}
                                   isMaster={props.isMaster}/>
                </Popup>
            </Toolbar>
        </AppBar>
    )
}

Profile.propTypes = {
    emailAddress: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    isMaster: PropTypes.bool
};

Profile.defaultProps = {
    isMaster: false
};

export default Profile;