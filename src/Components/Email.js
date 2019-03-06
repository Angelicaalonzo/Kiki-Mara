import React, { Component } from 'react';


const EmailInput = (props) => {
  const onEmailChange = (event) => {
    var email = event.target.value;

    this.props.onEmailChange(email);
  };

    return (
      <div className="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
        <button type="submit" class="btn btn-primary">Submit</button>     
      </div>
  
    );
  }



export default EmailInput;
