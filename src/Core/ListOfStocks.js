import React, { useEffect, useState } from 'react'
import { Button, OverlayTrigger, Popover, Table } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../config/auth';
import { deleteStock } from '../config/UserAPICall';
import { anyTriggerHit } from './AlgorithmToSendNotification';

const checkAllTriggers = (user, stock) => {

}


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
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [checkIfAnyTriggerHit, setCheckIfAnyTriggerHit] = useState("")
    const [triggers, setTriggers] = useState({
        buyPriceTrigerred: false,
        sellPriceTrigerred: false,
        stopLossTrigerred: false,
        trailingStopLossTrigerred: false,
    })
    const { buyPriceTrigerred, sellPriceTrigerred, stopLossTrigerred, trailingStopLossTrigerred } = triggers
    
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


    const userPricesToTrigger = stockName => {
        const popover = (
            <Popover id="popover-basic">
                <Table striped bordered hover size="sm">
                    <Popover.Content>
                        <thead>
                            <tr>
                                <th>
                                    Trigger Type
                                </th>
                                <th>
                                    Trigger Price
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Buy</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Sell</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Stop Loss</td>
                                <td>0</td>
                            </tr>
                            <tr>
                                <td>Trailing Stop Loss</td>
                                <td>0%</td>
                            </tr>
                        </tbody>
                    </Popover.Content>
                </Table>
            </Popover>
        );
        return (
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Button variant="secondary">{stockName}'s Trigger</Button>
            </OverlayTrigger>
        )
    }

    // const deleteThisStock = stockId => {
    //     console.log("delete this stock method is invoked");
    //     setLoading(true)
    //     deleteStock(user.email, stockId).then(res => {
    //         setLoading(false)
    //         if (res.error) {
    //             setError(res.error)
    //         } else {
    //             setSuccess(true)
    //             // hoping that the row will delete it self, as the useEffect - > preload method will be invoked as soon as the state value gets changed.
    //         }
    //     }
    //     ).catch(err => console.log(err)
    //     )
    // }


    const showStockInfo = stockName => {
        // console.log(stockName);
        // this needs redirect me to the information page
    }

    const findWhichToShow = (user, stock) => {
        const str = anyTriggerHit(user, stock)
        if (str) {
            alert(str)
            return <span className="badge badge-info">{str}</span>
        }
        else
            return <Link to={`/user/update/${stock.id}`} className="btn btn-success">Update</Link> 
    }


    return (
        <div className={className}>
            {
                stockArray.length === 0 ?
                    <div class="alert alert-danger" role="alert">
                        Your Search List is Empty.
                    </div> :

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
                                    <th scope="col">Change (In 5mins)</th>
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
                                    stockArray.map((stock, index) =>
                                        <tr>
                                            <a href={`https://in.finance.yahoo.com/quote/${stock.id}/analysis/`} target="_blank" className="">
                                                <td>
                                                    {stock.name}
                                                    {
                                                        <span>{` (${stock.id})`}</span>
                                                    }
                                                </td></a>
                                            <td className="font-weight-bold">{stock.currentPrice}</td>
                                            <td>{stock.previousPrice}</td>
                                            <td>{differenceAndPercentage(stock.currentPrice, stock.previousPrice)}</td>
                                            {
                                                user ? <>
                                                    <td scope="col">{userPricesToTrigger(stock.name)}</td>
                                                    <td scope="col">
                                                        {
                                                            findWhichToShow(user, stock)
                                                        }
                                                    </td>
                                                    <td onClick={() => deleteStock(user.email, stock.id)}>
                                                        <span className="btn btn-danger">
                                                            Delete
                                                    </span>
                                                    </td>
                                                </> : <></>
                                            }
                                            {/* </a> */}
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
