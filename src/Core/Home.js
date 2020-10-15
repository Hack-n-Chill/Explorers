import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import auth from '../config/auth';
import '../styles.css'
import { Link, Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import ListOfStocks from './ListOfStocks';

const Home = () => {
    const [user] = useAuthState(auth);

    const userIsNotLoggedIn = () =>
        <ListOfStocks className="m-auto"/>
    return (
        <div>
            <NavBar />
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