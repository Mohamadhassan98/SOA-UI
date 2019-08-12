import React from 'react'
import axios from 'axios';
import '../App2.css';
import Profile from "../components/ProfileNavBar";

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            personnelCode: '',
            inPlace: '',
            address: '',
            status: '',
            photo: '',
            isMaster: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.pk = props.match.params.pk;
    }


    selectImages = (event) => {
        this.setState({photo: URL.createObjectURL(event.target.files[0])});
    };

    handleChange(e) {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        });
    }

    uploadImage = () => {
        const fd = new FormData();
        console.log(this.state.photo);
        fd.append('photo', this.state.photo);
        axios.post('', fd)
            .then(res => {
                console.log(res);
            })
    };


    handleSubmit(event) {
        event.preventDefault()
    };


    componentDidMount() {
        const url = '127.0.0.1:8000/user/' + this.pk + '/';
        axios.get(url).then(response => {
            this.setState({
                firstName: response.data['first_name'],
                lastName: response.data['last_name'],
                phone: response.data['phone'],
                email: response.data['email'],
                personnelCode: response.data['personnel_code'],
                inPlace: response.data['in_place'],
                address: response.data['address'],
                photo: '', //TODO("Not in database yet")
                isMaster: response.data['status'] === 'ma'
            })
        }).catch(error => {
            //TODO("Show error pages!")
        })
    }

    render() {
        return (
            <div>
                <Profile emailAddress={this.state.email} firstName={this.state.firstName} lastName={this.state.lastName}
                         isMaster={this.state.isMaster}/>
                this.state.isMaster ? (
                <form className='FormCenterProfile' onSubmit={this.handleSubmit}>
                    <div className='accent'/>
                    <div className='profile-photo-master' onClick={() => this.fileInput.click()}>
                        <img src={this.state.photo} className="image" alt={this.state.photo}/>
                        <div className="middle">
                            <div className="text">change profile picture</div>
                        </div>
                    </div>
                    <div className="MasterProfile">
                        <div className="col-sm-4">
                            <input style={{display: 'none'}} className="FormField__Button mr-20 " type="file"
                                   onChange={this.selectImages} ref={fileInput => this.fileInput = fileInput}/>
                        </div>
                    </div>
                    <div className="MasterProfile">
                        <label className="MasterField_1">First Name</label>
                        <input type="text" id="first_name" className="MasterField_2" placeholder="Enter your first name"
                               name="firstName" value={this.state.firstName} onChange={this.handleChange}/>
                    </div>

                    <div className="MasterProfile">
                        <label className="MasterField_1">Last Name</label>
                        <input type="text" id="last_name" className="MasterField_2" placeholder="Enter your last name"
                               name="lastName" value={this.state.lastName} onChange={this.handleChange}/>
                    </div>
                    <div className="MasterProfile">
                        <label className="MasterField_1">Phone</label>
                        <input type="text" id="phone" className="MasterField_2" placeholder="Enter your first phone"
                               name="phone" value={this.state.phone} onChange={this.handleChange}/>
                    </div>

                    <div className="MasterProfile">
                        <label className="MasterField_1">personel code</label>
                        <input type="text" id="personnel_code" className="MasterField_2"
                               placeholder="Enter your personnel_code" name="personnel_code"
                               value={this.state.personnelCode} onChange={this.handleChange}/>
                    </div>
                    <div className="MasterProfile">
                        <label className="MasterField_1">in_place</label>
                        <input type="text" id="in_place" className="MasterField_2" placeholder="Enter your in_place"
                               name="in_place" value={this.state.inPlace} onChange={this.handleChange}/>
                    </div>

                    <div className="MasterProfile">
                        <label className="MasterField_1">address</label>
                        <input type="text" id="address" className="MasterField_2" placeholder="Enter your address"
                               name="address" value={this.state.address} onChange={this.handleChange}/>
                    </div>

                    <div className="MasterProfile">
                        <label className="MasterField_1">status</label>
                        <input type="text" id="status" className="MasterField_2" placeholder="Enter your status"
                               name="status" value={this.state.status} onChange={this.handleChange}/>
                    </div>
                    <div className="MasterProfile">
                        <button className="FormField__Button mr-20" onClick={this.uploadImage}>Save</button>
                    </div>
                </form>
                ) : (
                <form className='FormCenterProfile' onSubmit={this.handleSubmit}>
                    <div className='accent'/>
                    <div className='profile-photo'>
                        <img src={this.state.photo} alt={this.state.photo}/>
                    </div>
                    <div className="FormProfile">
                        <label className="FieldProfile_1">First Name</label>
                        <label id="firstname" className="FieldProfile_2">{this.state.firstName}</label>
                    </div>

                    <div className="FormProfile">
                        <label className="FieldProfile_1">Last Name</label>
                        <label id="lastname" className="FieldProfile_2">{this.state.lastName}</label>
                    </div>
                    <div className="FormProfile">
                        <label className="FieldProfile_1">Phone</label>
                        <label id="phone" className="FieldProfile_2">{this.state.phone}</label>
                    </div>

                    <div className="FormProfile">
                        <label className="FieldProfile_1">personnel code</label>
                        <label id="code" className="FieldProfile_2">{this.state.personnelCode}</label>
                    </div>
                    <div className="FormProfile">
                        <label className="FieldProfile_1">in_place</label>
                        <label id="inplace" className="FieldProfile_2">{this.state.inPlace}</label>
                    </div>

                    <div className="FormProfile">
                        <label className="FieldProfile_1">address</label>
                        <label id="address" className="FieldProfile_2">{this.state.address}</label>
                    </div>

                    <div className="FormProfile">
                        <label className="FieldProfile_1">status</label>
                        <label id="status" className="FieldProfile_2">{this.state.status}</label>
                    </div>
                </form>
                )
                <footer/>
            </div>
        )
    }
}
