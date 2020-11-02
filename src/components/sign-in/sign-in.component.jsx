import React, {Component} from 'react';
import FormInput from "../form-input/form-input.component";
import './sign-in.styles.scss';
import CustomButton from "../custom-button/custom-button.component";
import {auth, signInWithGoogle} from "../../firebase/firebase.utils.js";

class SignIn extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {email, password} = this.state

        try {

            await auth.signInWithEmailAndPassword(email,password);

            this.setState({email:"", password:""});

        } catch (error) {
            console.error(error)
        }

    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value})
    }

    render() {
        return (
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} name="email" type="email" label="email"
                               value={this.state.email} required/>

                    <FormInput handleChange={this.handleChange} name="password" type="password" label="password"
                               value={this.state.password} required/>
                    <div className="buttons">
                        <CustomButton type="submit">Sign In</CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn>Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignIn;