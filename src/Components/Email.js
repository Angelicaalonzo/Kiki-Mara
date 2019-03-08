import React, { Component } from 'react';

class EmailInput extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: ''
        }

        this.onEmailChange = this.onEmailChange.bind(this);
    }

    onEmailChange(event) {
        var email = event.target.value;

        this.props.onEmailInputChange(email);

        this.setState( () => {
                return {
                    email
                }
            }
        );
    };

    render() {
        return (
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input 
                    aria-describedby="emailHelp" 
                    className="form-control" 
                    id="exampleInputEmail1" 
                    onChange={this.onEmailChange}
                    placeholder="Enter email"
                    type="email"
                    value={this.state.email}  />
            </div>
        );
    };
}

export default EmailInput;