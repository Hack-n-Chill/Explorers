import React from 'react'
import Base from './Base'
import { useAuthState } from "react-firebase-hooks/auth";
import auth from '../config/auth';
import '../styles.css'
import { Link, Redirect } from 'react-router-dom';

const Home = () => {
    const [user] = useAuthState(auth);

    const userIsNotLoggedIn = () =>
        <Base
            title="Hello User"
            description="Please Create an account if you have not any!!"
        >
        <div className="container-fluid">
            <div className="jumbotron bg-dark text-white text-center">
                <div className="row">
                    <div className="col-md">
                            <Link to="/signup"><button type="button" className="btn btn-outline-success btn-lg" >SignUp <i class="fas fa-user-plus"></i> </button></Link>
                    </div>
                    <div className="col-md">
                            <Link to="/signin"><button type="button" className="btn btn-outline-danger btn-lg" >SignIn <i class="fas fa-user-check" ></i> </button></Link>
                    </div>
                </div>
            </div>
        </div></Base>

    return (
        <div>
            {user ?
                <Redirect to="/user/dashboard" />
                :
                < div >
                    {userIsNotLoggedIn()}
                </div>
            }
        </div>
    )
}

export default Home