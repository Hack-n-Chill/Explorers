import React, { useEffect, useState } from 'react'
import '../styles.css'
import { Redirect } from 'react-router-dom';
import NavBar from './NavBar';
import ListOfStocks from './ListOfStocks';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../config/auth';
import Footer from './Footer';
import { getAllStocks } from '../config/UserAPICall';

const Home = () => {

    const [stocks, setStocks] = useState([])
    const [user] = useAuthState(auth)
    useEffect(() => {
        getAllStocks().then((stocks) => setStocks(stocks)
        ).catch(err => console.log(err))
    }, [])
    
    return (
        <div>
            <NavBar />
            {user ?
                <Redirect to="/user/dashboard" />
                :
                < div >
                    <ListOfStocks className="mx-3" stockArray={stocks} />
                </div>
            }
            <Footer />
        </div>
    )
}

export default Home