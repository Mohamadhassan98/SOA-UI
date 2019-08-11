import React from 'react';
import PropTypes from 'prop-types';
import Form from '../components/Form';
import '../App2.css';


const ProfileMaster = (props) => (
    <div>
        <Form values={props.profileFields} isMaster={true}/>
        <footer/>
    </div>
);

ProfileMaster.propTypes = {
    profileFields: PropTypes.object.isRequired
};

export default ProfileMaster;
