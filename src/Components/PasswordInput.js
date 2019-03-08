import React, { Component } from 'react';

class PasswordInput extends Component {

    constructor(props){
        super(props);

        this.state = {
            password: ''
        }

        this.onPasswordChange = this.onPasswordChange.bind(this);        

    }

    onPasswordChange(event){
        const password = event.target.value;

        this.setState( () => {
                return {
                    password
                }
            }
        );
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input className="form-control" 
                       id="exampleInputPassword1" 
                       onChange={this.onPasswordChange}
                       placeholder="Password" 
                       type="password"
                       value={this.state.password}  />
            </div>
        );
    };
}

export default PasswordInput;