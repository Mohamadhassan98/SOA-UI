import React from 'react';
import PropTypes from 'prop-types';
import Form2 from '../components/Form2';
import '../App2.css';

const Profile = (props) => (
    <div>
        <Form2 values={props.profileFields}/>
        <footer/>
    </div>
);

Profile.propTypes = {
    profileFields: PropTypes.object.isRequired
};

export default Profile
