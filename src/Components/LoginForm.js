import React, { Component } from 'react';
import EmailInput from './EmailInput';
import PasswordInput from './PasswordInput';

class LoginForm extends Component {

    //constructor
    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
        }

        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    //handler for data from child component
    onEmailChange(email){
        this.setState( () => {
                return {
                    email
                };
            }
        );
    }

    //handler for data from child component
    onPasswordChange(password){
        this.setState( () => {
                return {
                    password
                };
            }
        );
    }

    onFormSubmit(event){
        event.preventDefault();

        const email = "Email address is: " + this.state.email;
        const password = "Pasword is: " + this.state.password;

        this.setState( () => {
                return {email};
            }
        );
        this.props.onFormSubmit(email);

        this.setState( () => {
            return {password};
            }
        );
        this.props.onFormSubmit(password);
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onFormSubmit}>
                    <EmailInput onEmailInputChange={this.onEmailChange}/>
                    <PasswordInput onPasswordChange={this.onPasswordChange}/>
                    <button type="submit" 
                            className="btn btn-primary">Submit</button>
                </form>
            </div>            
        );
    };
}

export default LoginForm;