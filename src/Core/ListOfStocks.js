import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../config/auth';

const ListOfStocks = ({
    stockArray = [{
        name: "ITC",
        currentPrice: 164,
        previousPrice: 168,
    }, {
        name: "Reliance",
        currentPrice: 2285,
        previousPrice: 2267,
    }, {
        name: "Bharti Airtel",
        currentPrice: 417,
        previousPrice: 430,
    }, {
        name: "IOL Chemicals",
        currentPrice: 742,
        previousPrice: 738,
    }],
    className = ""
}) => {

    const differenceAndPercentage = (currentValue, previousValue) => {
        const diff = currentValue - previousValue;
        const percentage = (diff / previousValue) * 100;
        const diffClass = () => (diff < 0 ? "text-danger" : "text-success")
        return (
            <div className={diffClass()}>
                {diff}
              (
                <span>
                    {percentage.toPrecision(2)}
                </span>%)
            </div>
        )
    }

    const [showDropDown, setShowDropDown] = useState(false)
    const [user] = useAuthState(auth)
    const userPricesToTrigger = stockName =>
        <div className="btn-group">
            <button className="btn btn-secondary dropdown-toggle" href="#" type="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                onClick={() => setShowDropDown(!showDropDown)
                }>
                {stockName} Triggers
            </ button>
        </div>

    const deleteThisStock = (event) => {
        console.log("delete this stock method is invoked");
    }
    
    return (
        <div className={className}>
            {
                stockArray.length === 0 ? <>Empty Array</> :

                    <>
                        <ul className="list-group mt-1 border-top border-dark">
                            <li className="list-group-item font-weight-bold dark text-white">List of {user ? <span className="font-weight-lighter">{user.displayName}'s</span> : "All"} Stocks</li>
                        </ul>
                        <table className="table table-striped table-hover border border-dark">
                            <thead>
                                <tr>
                                    <th scope="col">Stock Name</th>
                                    <th scope="col ">Current Price</th>
                                    <th scope="col">Previous Price</th>
                                    <th scope="col">Change</th>
                                    {
                                        user ? <>
                                            <th scope="col">Triggers</th>
                                            <th scope="col">Update</th>
                                            <th scope="col">Delete</th>
                                        </> : <></>
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stockArray.map((stock, index) => <tr>
                                        <td>{stock.name}</td>
                                        <td className="font-weight-bold">{stock.currentPrice}</td>
                                        <td>{stock.previousPrice}</td>
                                        <td>{differenceAndPercentage(stock.currentPrice, stock.previousPrice)}</td>
                                        {
                                            user ? <>
                                                <td scope="col">{userPricesToTrigger(stock.name)}</td>
                                                <td scope="col">
                                                    <Link to={`/user/update/${stock.name}/${user.displayName}`} className="btn btn-success">Update</Link></td>
                                                <td onClick={deleteThisStock}>
                                                    <span className="btn btn-danger">
                                                        Delete
                                                    </span>
                                                </td>
                                            </> : <></>
                                        }
                                    </tr>
                                    )
                                }
                            </tbody>
                        </table></>
            }
        </div>
    )
}

export default ListOfStocks
