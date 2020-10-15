import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Redirect, Link } from 'react-router-dom';
import auth from '../config/auth'
import { getAllWatchList } from '../config/UserAPICall';

const UserDashBoard = () => {
    // this is user dashboard, that i need to make
    // i am considering that this user is an JSON object; which is being certain properties.
    const [user] = useAuthState(auth);
    const [success, setSuccess] = useState(false);
    const performRedirect = () => {
        if (success) {
            return <Redirect to="/" />
        }
    }

    const [stocks, setStocks] = useState([{
        name: "",
        price : 0,
    }])

    const makeNavBar = () =>
        <nav className="navbar navbar-dark bg-dark by-5">
            <a className="navbar-brand text-uppercase">{user.displayName}</a>
            <form className="form-inline">
                <button className="btn btn-outline-secondary my-2 my-sm-0 text-white btn-lg" onClick={() => {
                    auth.signOut().then(() => setSuccess(true)
                    ).catch(err => console.log(err)
                    )
                }}>LogOut</button>

                {
                    /*
                        Dont know why, but everytime after a refresh the website loads into localhost:300/signin route
                        even a successful logout leads to /signin route   ==============> major issue
                    */
                }
            </form>
        </nav>

    const watchLists = () => {

    }

    const changeWatchList = wL => event => {
        const stocks = getAllStocks(wl);
        setStocks(stocks);
    }
    

    const listOfWatchLists = () => {
        const watchLists = getAllWatchList(user); // an api call to the server to fetch all the eatchLists of tht secific user
        return (
            <div>
                {
                    watchLists.length === 0 ?
                        <Link to="/user/create/watchlist"><div className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Add WatchList
                        </div></Link>
                        : <>
                            <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {user.displayName}'s WatchLists
                            </a>
                            <div className="dropdown-menu">
                                {
                                    watchLists.map((watchList, index) => <button className="dropdown-item " type="button" onClick={changeWatchList({watchList})}>{watchList}</button>)
                                }
                            </div>
                        </>
                }
            </div>
        )
    }

    return (
        <>
            {performRedirect()}
            <div className="row">
                {makeNavBar()}
            </div>
            <div className="row">
                <div className="col-3 ">
                    {watchLists()}
                </div>
                <div className="col-9">
                    {listOfStocks()}
                </div>
            </div>
        </>
    )
}

export default UserDashBoard
