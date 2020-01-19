import React, { Component } from 'react';
import '../../css/Registration.css';
import { BrowserRouter, Push } from 'react-router-dom';

const initalState = {
    RegistrationID: 0,
    FullName: '',
    UserName: '',
    Password: '',
    ConfirmPassword: '',   
    ContactNumber: '',
    ErrorMessage: '',
    SuccessMessage : ''
};
export class Registration extends Component {
    constructor(prop) {
        super(prop);
        this.state = initalState;
    }

    myChangeHandler = (e) => {
    //console.log(e.target.name);
        //console.log(e.target.value);
        const value = e.target.value;
        this.setState({
            [e.target.name]: value
        }); 
    }

    formValidate = (event) => {
        const { Password, ConfirmPassword } = this.state;
        console.log(this.state);
        let ErrorMessage = "";
        let result = true;
        const matches = Password === ConfirmPassword;
        if (this.state.UserName.length < 9) {
            ErrorMessage += "Enter User Name..  ";
            result = false;
        }
        if (matches) {
            result = true
        } else {
            ErrorMessage += "Enter Correct Password ... ";
            result = false;
        }
        if (this.state.ContactNumber.length < 9) {
            ErrorMessage += "Enter Contact Number..  ";
            result = false;
        }
        if (this.state.FullName == '') {
            ErrorMessage += "Enter Full Name..  ";
            result = false;
        }
        this.setState({ ErrorMessage: ErrorMessage });
        return result;
    }

    SubmitRegistrationForm = (event) => {
        event.preventDefault();
        if (this.formValidate()) {
            fetch('Registration/InsertUpdate',
                {
                    method: "POST",
                    headers:
                    {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(this.state)
                })
                .then(res => res.json())
                .then((result) => {
                    this.setState({ state: initalState });
                    this.setState({ SuccessMessage: result });
                    
                },
                    (error) => {
                        alert("Error..");
                    })
        }
    }

    render() {
        return (
            <div>
                <div className="card bg-light">
                    <article className="card-body mx-auto mx-width" style={{ width: "600px" }} >
                        <h4 className="card-title mt-3 text-center">Create Account</h4>
                        <p className="text-center">Get started with your free account</p>
                        {this.state.ErrorMessage ? (
                            <div className="text-center alert alert-danger" role="alert" >{this.state.ErrorMessage}</div>)
                            : null}
                        {this.state.SuccessMessage ? (
                            <div className="text-center alert alert-primary" role="alert">{this.state.SuccessMessage}</div>)
                            : null}
                        <p className="d-none">
                            <a href="" className="btn btn-block btn-twitter"> <i className="fab fa-twitter"></i>
                                Login via Twitter</a>
                            <a href="" className="btn btn-block btn-facebook"> <i className="fab fa-facebook-f"></i>
                                Login via facebook</a>
                        </p>
                        <p className="divider-text d-none">
                            <span className="bg-light">OR</span>
                        </p>
                        <form onSubmit={this.SubmitRegistrationForm}>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-user"></i> </span>
                                </div>
                                <input id="FullName" name="FullName" className="form-control" placeholder="Full name"
                                    onChange={this.myChangeHandler} value={this.state.FullName}  type="text" autoComplete="true" />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-envelope"></i> </span>
                                </div>
                                <input id="UserName" name="UserName" className="form-control" placeholder="User Name"
                                    onChange={this.myChangeHandler} value={this.state.UserName} type="text" autoComplete="true" />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-phone"></i> </span>
                                </div>
                                <input id="Password" name="Password"  className="form-control" placeholder="Password"
                                    onChange={this.myChangeHandler} value={this.state.Password} type="text" autoComplete="true" />
                            </div>
                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-key"></i> </span>
                                </div>
                                <input id="ConfirmPassword" name="ConfirmPassword" className="form-control" placeholder="Re Enter Password"
                                    onChange={this.myChangeHandler} value={this.state.ConfirmPassword} type="text" autoComplete="true" />
                            </div>

                            <div className="form-group input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"> <i className="fa fa-key"></i> </span>
                                </div>
                                <input id="ContactNumber" name="ContactNumber" className="form-control" placeholder="Contact Number"
                                    onChange={this.myChangeHandler} value={this.state.ContactNumber} type="text" autoComplete="true" />
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary btn-block"> Create Account  </button>
                            </div>
                                <p class="text-center">Have an account? <a href="">Log In</a> </p>   
                        </form>
                    </article>
                </div>
            </div>
        );
    }
}