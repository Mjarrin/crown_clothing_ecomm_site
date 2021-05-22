import React, { Component } from "react";
import { connect } from "react-redux";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { googleSignInStart, emailSignInStart } from "../../redux/user/user.actions";

class SignIn extends Component {
    constructor(){
        super();
        this.state = {

        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const { emailSignInStart } = this.props;
        const { email, password } = this.state;

        emailSignInStart(email,password);
    }
    
    handleChange = (e) => {
        const {value , name } = e.target;

        this.setState({
            [name] : value
        })

    }
    
    render() {
    const { googleSignInStart } = this.props;
        return (

            <div className="sign-in">
                <h2> I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                    handleChange={this.handleChange} 
                    name="email" 
                    type="email" 
                    value={this.state.email} 
                    label="email" 
                    required/>
                    <FormInput handleChange={this.handleChange} name="password" type="password" value={this.state.password} label="password" required/>
                    <div className="buttons"> 
                    <CustomButton  type="submit"> Sign In</CustomButton>
                    <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn> Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>

        )


    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email,password}))


})


export default connect(null,mapDispatchToProps)(SignIn);