import React, { useState, useEffect } from 'react'
import { getAllStocks, updateStockPrice, addStock, deleteStock, getUserStocks } from '../config/UserAPICall';
import Footer from '../Core/Footer';
import ListOfStocks from '../Core/ListOfStocks';
import NavBar from '../Core/NavBar';
import firebase from 'firebase';


const UserDashBoard = () => {
    // this is user dashboard, that i need to make
    // i am considering that this user is an JSON object; which is being certain properties.

    const [stocks, setStocks] = useState([])

    useEffect(() => {
        getUserStocks(firebase.auth().currentUser.email ).then((stocks) => setStocks(stocks)
        ).catch(err => console.log(err))
    }, [])
    

/*     
    const makeNavBar = () =>
        <nav className="navbar navbar-dark bg-dark by-5">
            <a className="navbar-brand text-uppercase">{user.displayName}</a>
            <form className="form-inline">
                <button className="btn btn-outline-secondary my-2 my-sm-0 text-white btn-lg align-right" onClick={() => {
                    auth.signOut().then(() => <Redirect to="/" />
                    ).catch(err => console.log(err)
                    )
                }}>LogOut</button>
            </form>
        </nav>

    const changeWatchList = wL => event => {
        // const stocks = getAllStocks(user, event.target.value);
        // setStocks(stocks);
        console.log("invoked");
    }


    const watchLists = () => {
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
                                    watchLists.map((watchList, index) => <button className="dropdown-item " type="button" onClick={changeWatchList}>{watchList}</button>)
                                }
                            </div>
                        </>
                }
            </div>
        )
    } 
    const getStockPriceFromAPI = (id) => {
        let url = 'https://finnhub.io/api/v1/quote?symbol=';
        let token = '&token=bu4heof48v6p8t6ghn2g';
        url = url + id + token;
        let price = 0;
        request(url, { json: true }, (err, res, body) => {
            if (err) { return console.log(err); }
            console.log(id, " => ", body.c);
            price =  body.c;
        });
        return price;
    }
*/

    return (
        <>
            <NavBar />
            <div className="row mt-2">
                <div className="col-1 ml-2 ">
                    {/* {watchLists()} */}
                </div>
            </div>
            <div className="row ml-4">
                <div className="col">
                    <ListOfStocks className="mr-3" stockArray={stocks}/>
                </div>
            </div>
            <Footer userPresent />
        </>
    )
}

export default UserDashBoard
