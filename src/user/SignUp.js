import React, { useState } from 'react'
import SignUpImage from '../Assets/google-sign-in.png'
import firebase from 'firebase/app';
import Base from '../Core/Base'
import { Link } from 'react-router-dom';


const LogInWithGoogle = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, success, error } = values; // object destructured

    const signUpWithGoogle = () => {
        console.log("SignUp with Google method invoked, need to write method so that a user can sign up with his/her google account");
    }

    const handleChange = name => event => {
        setValues({ ...values, error: "", [name]: event.target.value });
    };

    const onSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(res => {
                var user = firebase.auth().currentUser;
                user.updateProfile({
                displayName: name,
                })
                console.log(user.displayName + " signed up & logged in successfully");
            })
            .catch(function (error) {
        // Handle Errors here.
            alert(error.message);
        });
    };

    const signUpForm = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="font-weight-bold">Name</label>
                            <input
                                className="form-control"
                                type="text"
                                onChange={handleChange("name")}
                                value={name}
                            />
                        </div>
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

    const successMesssage = () => {
        return (
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">

                    <div className="alert alert-sucess"
                        style={{ display: success ? "" : "none" }}
                    >
                        New Account was created sucessfully. Please <Link to="/signin">Login Here</Link>
                    </div>
                </div>
            </div>
        );
    };

    const errorMesssage = () => {
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
    };


    return (
        <Base title="SignUp Page" description="A page for a user to SignUp!">
            {successMesssage()}
            {errorMesssage()}
            {signUpForm()}
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-left">
                    <p className="text-white text-center font-weight-bold">Or</p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 offset-sm-3 text-left">
                    <button onClick={signUpWithGoogle} type="submit">
                        <img src={SignUpImage} alt="Sign Up with google" height="50" className="bg-dark" />
                    </button>
                </div>
            </div>
            <p className="text-white text-center">
                {JSON.stringify(values)}
            </p>
        </Base>
    )
}

export default LogInWithGoogle
