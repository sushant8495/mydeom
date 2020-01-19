import React, { Component } from "react";
import '../../css/LoginForm.css';
const initalState = {
    UserName: '',
    Password: '',
    ErrorMessage :''
}
export class LoginForm extends Component {
    static displayName = "Hello";
    constructor(props) {
        super(props);
        this.state = initalState;
    }
    myChangeHandler = event => {
        const value = event.target.value;
        this.setState({
            [event.target.name]: value
        });
        console.log(this.state);
    }

    formValidate = () => {
        const { UserName, Password } = this.state;
        let ErrorMessage = "", result = true;
        if (UserName == '') {
            ErrorMessage = "Enter User Name..  ";
            result = false;
        }
        if (Password == '') {
            ErrorMessage += "Enter Password ";
            result = false;
        }
        this.setState({ ErrorMessage: ErrorMessage });
        return result;
    }
    OnSubmitHandler = (event) => {
        event.preventDefault();
        if (this.formValidate()) {
            fetch('Registration/Login', {
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
                    if (!result)
                        this.setState({ ErrorMessage : "Enter Correct User Name And Password" });
                    alert(result);

                },
                    (error) => {
                        alert("Error..");
                    })
        }
    }
    render() {
        return (
            <div>
                <div className="">
                    <div className="loginmodal-container">
                        <h1>Login to Your Account</h1><br />
                        {this.state.ErrorMessage ? (<div className="alert alert-danger" role="alert">
                            {this.state.ErrorMessage} </div>) :
                            null}
                        <form onSubmit={this.OnSubmitHandler}>
                            <input id="UserName" name="UserName" className="form-control" placeholder="User Name"
                                onChange={this.myChangeHandler} value={this.state.UserName} type="text" autoComplete="true" />
                            <input id="Password" name="Password" className="form-control" placeholder="User Name"
                                onChange={this.myChangeHandler} value={this.state.Password} type="text" autoComplete="true" />
                            <input type="submit" name="login" className="login loginmodal-submit" value="Login" />
                        </form>
                        <div className="login-help">
                            <a href="registration">Register</a> - <a href="#">Forgot Password</a>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}