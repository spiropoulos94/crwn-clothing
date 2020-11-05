import React from 'react';
import FormInput from "../form-input/form-input.component";
import "./sign-up.styles.scss";
import CustomButton from "../custom-button/custom-button.component";
import {auth, createUserProfileDocument} from "../../firebase/firebase.utils";


class SignUp extends React.Component {
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
        const {displayName, email, password, confirmPassword} = this.state;
        if(password !== confirmPassword){
            alert("passwords don't match!")
            return;
        }
        try {
            //ousiastika to {user} einai ayto pou ginetai return apo to parakatw function
            const {user} = await auth.createUserWithEmailAndPassword(email, password);

            //to createUseRprofileDocument kanei .set() ta user & display name sto firestore
            await  createUserProfileDocument(user,{displayName})
            this.setState(
                {
                    displayName: "",
                    email: "",
                    password: "",
                    confirmPassword: ""
                }
            )
        }
        catch (error){
            console.error(error)
        }
    }

    handleChange = (event) => {
        const {name, value} = event.target;

        this.setState({
            [name] : value
        })
    }


    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <div className="sign-up">
                <h2 className="title">I do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className="sign-up-form" onSubmit={this.handleSubmit}>
                    <FormInput required type="text"  label="Display Name" name="displayName" value={displayName} onChange={this.handleChange} />
                    <FormInput required type="email" label="Email" name="email" value={email} onChange={this.handleChange} />
                    <FormInput required type="password"  label="Password" name="password" value={password} onChange={this.handleChange} />
                    <FormInput required type="password"  label="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />

                    <CustomButton type="submit">SIGN UP</CustomButton>
                </form>
            </div>
        );
    }
}

export default SignUp;