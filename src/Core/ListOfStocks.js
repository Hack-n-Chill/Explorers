import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
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

    const [user] = useAuthState(auth)
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
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stockArray.map((stock, index) => <tr>
                                        <td>{stock.name}</td>
                                        <td className="font-weight-bold">{stock.currentPrice}</td>
                                        <td>{stock.previousPrice}</td>
                                        <td>{differenceAndPercentage(stock.currentPrice, stock.previousPrice)}</td>
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
