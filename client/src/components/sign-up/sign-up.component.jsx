import React, { Component } from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import "./sign-up.styles.scss";
import { render } from "@testing-library/react";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import { connect } from "react-redux";

import { signUpStart } from "../../redux/user/user.actions"


//signUpStart

class SignUp extends Component {
    constructor() {
        super();

        this.state = {
            displayName: "",
            email: "",
            password: "",
            confirmPassword: ""

        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { displayName, email, password, confirmPassword } = this.state;
        console.log("user submit " , email , password);
        if (password !== confirmPassword) {
            alert("Passwords dont match")

            return;
        }

            const { signUpStart } = this.props;

            signUpStart({ displayName, email, password });
            


            // const { user } = await auth.createUserWithEmailAndPassword(email, password);
            // await createUserProfileDocument(user, {displayName});

            // clearing out form after saving the user info to firebase

     

    }

    handleChange = event => {
        const { name, value} = event.target;

        console.log("changed " , event.target.name , "value " , value)

       this.setState({[name] : value}, () => console.log(this.state)) 
    }




    render() {
        const { displayName, email, password, confirmPassword } = this.state;
    
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with you email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput
                        type="text"
                        name="displayName"
                        value={displayName}
                        handleChange={this.handleChange}
                        label="Display Name"
                        required
                    />


                    <FormInput
                        type="email"
                        name="email"
                        value={email}
                        handleChange={this.handleChange}
                        label="Email"
                        required
                    />


                    <FormInput
                        type="password"
                        name="password"
                        value={password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />

                    <FormInput
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        handleChange={this.handleChange}
                        label="Confirm Password"
                        required
                    />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        )
    }
}



const mapDispatchToProps = dispatch => ({
    signUpStart : (userRegistrationDetails) => dispatch(signUpStart(userRegistrationDetails))
})

export default connect(null,mapDispatchToProps)(SignUp);