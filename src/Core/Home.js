import React from 'react'
import '../styles.css'
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import ListOfStocks from './ListOfStocks';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../config/auth';
import Footer from './Footer';

const Home = () => {
    const [user]=useAuthState(auth)
    return (
        <div>
            <NavBar />
            {user ?
                <Redirect to="/user/dashboard" />
                :
                < div >

                    <ListOfStocks className="mx-3" />
                </div>
            }
            <Footer />
        </div>
    )
}

export default Home