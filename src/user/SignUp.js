import React, { useState } from 'react'
import SignUpImage from '../Assets/google-sign-up.png'
import firebase from 'firebase/app';
import Base from '../Core/Base'
import { Link, Redirect } from 'react-router-dom';


const SignUp = () => {

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false
    });

    const { name, email, password, success, error } = values; // object destructured

    const addUsersInCollection = (user,name) => {
        // Create a doc of User collection in firestore
        const userDB = firebase.firestore().collection("Users");
        userDB.doc(user.email).set({
        name: name,
        userStocks: [],
        watchList : []
    })
    .then(function() {
        console.log("User added in Collection successfully!");
    })
    .catch(function(error) {
        console.error("Error writing in users collection: ", error);
    });

};

    const signUpWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            // The signed-in user info.
            let user = result.user;
            addUsersInCollection(user,user.displayName);
            console.log(user.displayName.toString() + " signed up successfully");
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
                addUsersInCollection(res.user,name);
                console.log(name + " signed up & logged in successfully");
                setValues({
                    ...values,
                    success: true,
                    email,
                    password
                })
            })
            .catch(function (error) {
        // Handle Errors here.
            alert(error.message);
        });
    };

    const performRedirect = () => {
        if (success) {
            return <Redirect to="/" />
        }
    }
    const signUpForm = () => {
        return (
            <div className="row mt-2">
                {performRedirect()}
                <div className="col-md-6 offset-sm-3 text-left">
                    <form action="">
                        <div className="form-group">
                            <label className="font-weight-bold">Name</label>
                            <input
                                className="form-control controlInput2"
                                type="text"
                                onChange={handleChange("name")}
                                value={name}
                            />
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Email</label>
                            <input className="form-control controlInput2" onChange={handleChange("email")} type="email"
                                value={email}
                            />
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold">Password</label>
                            <input className="form-control controlInput2"
                                value={password}
                                onChange={handleChange("password")} type="password" />
                        </div>
                        <div className="btn btn-success btn-block hvr" onClick={onSubmit}>Submit</div>
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
            {performRedirect()}
            {successMesssage()}
            {errorMesssage()}
            {signUpForm()}
            <div className="row" >
                <div className="col-md-6 offset-sm-3 text-left">
                    <p className="text-black pt-2 text-center font-weight-bold">Or</p>
                </div>
            </div>
            <div className="row">
                <div className="col-5"></div>
                <div className="col-2" >
                    <button onClick={signUpWithGoogle} type="submit">
                        <img src={SignUpImage} alt="Sign Up with google" height="50" className="bg-white img-hvr" />
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

export default SignUp
