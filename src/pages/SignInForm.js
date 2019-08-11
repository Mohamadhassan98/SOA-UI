import React, {Component} from 'react';
import '../App.css';

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.username === 'master' && this.state.password === 'master') {
            this.history.pushState(null, 'sign-in');
        }
    }

    render() {
        return (
            <div className='App'>
                <div className='FormTitle'>
                    <div className="FormCenter">
                        <form className="FormFields" onSubmit={this.handleSubmit}>
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="username">Username</label>
                                <input type="username" id="username" className="FormField__Input"
                                       placeholder="Enter your username" name="username" value={this.state.username}
                                       onChange={this.handleChange}/>
                            </div>

                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="password">Password</label>
                                <input type="password" id="password" className="FormField__Input"
                                       placeholder="Enter your password" name="password" value={this.state.password}
                                       onChange={this.handleChange}/>
                            </div>
                            <div className="FormField">
                                <button className="FormField__Button mr-20">Sign In</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SignInForm;


// WEBPACK FOOTER //
// ./src/pages/SignInForm.js