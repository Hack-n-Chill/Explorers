import React, { useState } from 'react'
import SignInImage from '../Assets/google-sign-in.png'
import Base from '../Core/Base'
import firebase from 'firebase/app' // here is some issue regarding the imports
import auth from '../config/auth'
import { Redirect } from 'react-router-dom'

const SignIn = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        success: false,
        didRedirect: false, // it's gonna redirect the user to user dashboard or admin dashboard after a succesful authentication
    });

    const { email, password, success } = values; // object destructured

    // check higherOrder functions
    const handleChange = name => event => {
        setValues({ ...values, error: "", [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(res => {
                console.log(res.user + " signed in successfully");
                setValues({
                    ...values,
                    success: true,
                    email,
                    password,
                })
            })
            .catch(function (error) {
                // Handle Errors here.
                alert(error.message);
            });
    };

    const signInForm = () => {
        return (
            <div className="row mt-3">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="font-weight-bold">Email</label>
                            <input className="form-control" onChange={handleChange("email")} type="email"
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Password</label>
                            <input className="form-control"
                                value={password}
                                onChange={handleChange("password")} type="password" />
                        </div>
                        <div className="btn btn-success btn-block" onClick={onSubmit}>Submit</div>
                    </form>
                </div>
            </div>
        );
    }

    /*     const errorMesssage = () => {
            return (
                <div className="row">
                    <div className="col-md-6 offset-sm-3 text-left">
    
                        <div className="alert alert-danger"
                            style={{ display: error ? "" : "none" }}
                        >
                            {error}
                        </div>
                    </div>
                </div>
            );
        }; */

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function (result) {
            // The signed-in user info.
            console.log(result.user.displayName.toString() + " signed in successfully");
            // ...
            setValues({
                ...values,
                success: true
            })
        })
            .catch(function (error) {
                // Handle Errors here.
                alert(error.message);
            });
    }

    const performRedirect = () => {
        if (success) {
            return <Redirect to="/" />
        }
    }

    return (
        <Base title="SignIn Page" description="A page for an existing user to signin" className="font-weight-bold">
            {signInForm()}
            {performRedirect()}
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-left">
                    <p className="text-black pt-2 text-center font-weight-bold">Or</p>
                </div>
            </div>
            <div className="row">
                <div className="col-5"></div>
                <div className="col-2">
                    <button onClick={signInWithGoogle} >
                        <img src={SignInImage} alt="Sign Up with google" height="50" className="bg-white" />
                    </button>
                </div>
                <div className="col-5"></div>
            </div>
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    )
}

export default SignIn
