import React from 'react'

const ListOfStocks = ({
    stockArray = [{
        name: "ITC",
        currentPrice : 164,
        previousPrice : 168,
    }, {
            name: "Reliance",
            currentPrice: 2285,
        previousPrice : 2267,
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
    return (
        <div className={className}>
            {
                stockArray.length === 0 ? <>Empty Array</> :

                    <>
                        <ul className="list-group mt-1">
                            <li className="list-group-item list-group-item-primary font-weight-bold">List of Stocks</li>
                        </ul>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Stock Name</th>
                                <th scope="col">Current Price</th>
                                <th scope="col">Previous Price</th>
                                <th scope="col">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                stockArray.map((stock, index) => <tr>
                                    <td>{stock.name}</td>
                                    <td>{stock.currentPrice}</td>
                                    <td>{stock.previousPrice}</td>
                                    <td>{stock.currentPrice-stock.previousPrice}</td>
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
