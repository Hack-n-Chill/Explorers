import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Redirect } from 'react-router-dom'
import auth from '../config/auth'
import { getStock, updateStock } from '../config/UserAPICall'
import Base from '../Core/Base'

// for every refresh, it's taking me into /user/dashboard ======> minor bug, will fix it today afternoon.
const UpdateStockInfo = ({ match }) => {
    const [stockInfo, setStockInfo] = useState({
        name: "",
        currentPrice: 0.00,
        sell: 0.00,
        buy: 0.00,
        stopLoss: 0.00,
        trailingStopLoss: 0.00,
    })
    const { name, currentPrice, sell, buy, stopLoss, trailingStopLoss } = stockInfo;
    const [user] = useAuthState(auth)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)

    const preLoad = stockId => {
        getStock(user.email, stockId).then(res => {
            // considering res is going to store all the updates of the stock
            setStockInfo({
                ...stockInfo,
                name: res.name,
                currentPrice: res.currentPrice,
                sell: res.sell,
                buy: res.buy,
                stopLoss: res.stopLoss,
                trailingStopLoss: res.trailingStopLoss
            })
        }
        ).catch(err => console.log(err))
    }

    useEffect(() => {
        preLoad(match.params.stockId);
    }, [])

    const onSubmit = event => {
        event.preventDefaults()
        setLoading(true)
        updateStock(user.email, match.params.stockId, stockInfo).then(data => {
            console.log(`Data is: ` + JSON.stringify(data));
            if (data.error) {
                setLoading(false)
                setError(data.error)
            } else { 
                setStockInfo({
                    ...stockInfo,
                }) // update all the info
                setSuccess(true)
                setLoading(false)
            }
        }
        ).catch(err => console.log(err)
        )
    }

    const handleChange = name => event => {
        const value = event.target.value
        setStockInfo({
            ...stockInfo,
            [name]: value,
        })
    }



    const updateForm = () => (
        <form>
            <div className="form-group row">
                <label for="exampleFormControlInput1" className="col-sm-2 col-form-label">Stock Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control-plaintext" id="exampleFormControlInput1" placeholder={name ? name : "Any random name"} readOnly onChange={handleChange("name")} />
                </div>
            </div>
            <div className="form-group row">
                <label for="exampleFormControlInput1" className="col-sm-2 col-form-label">Stock Price</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control-plaintext" id="exampleFormControlInput1" placeholder={currentPrice ? currentPrice : 100} readOnly onChange={handleChange("price")} />
                </div>
            </div>
            <div className="form-group row">
                <label for="exampleFormControlInput1" className="col-sm-2 col-form-label">Sell Trigger Price</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder={sell ? sell : 120} onChange={handleChange("sell")} />
                </div>
            </div>
            <div className="form-group row">
                <label for="exampleFormControlInput1" className="col-sm-2 col-form-label">Buy Trigger Price</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder={buy ? buy : 80} onChange={handleChange("buy")} />
                </div>
            </div>
            <div className="form-group row">
                <label for="exampleFormControlInput1" className="col-sm-2 col-form-label">Stop Loss Trigger Price</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder={stopLoss ? stopLoss : 50} onChange={handleChange("stopLoss")} />
                </div>
            </div>
            <div className="form-group row">
                <label for="exampleFormControlInput1" className="col-sm-2 col-form-label">Trailing Stop Loss Trigger Price</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder={`${trailingStopLoss ? trailingStopLoss : 10}%`} onChange={handleChange("trailingStopLoss")} />
                </div>
            </div>
            <div className="form-group row">
                <button type="submit" onClick={onSubmit} className="col-12 btn btn-lg btn-success mb-3 ">
                    Update Triggers
                </button>
            </div>
        </form>
    )

    return (
        <Base title={match.params.stockId} description="Update Your Stock Triggers">
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {updateForm()}
                    {
                        () =>
                            <div className="alert alert-success mt-3"
                                style={{ display: success ? "" : "none" }}
                            >
                                <h4>{name ? name : "That random named stock"} trigeers are updated successfully</h4>
                            </div>


                    }
                    {
                        () =>
                            <div className="alert alert-warning mt-3"
                                style={{ display: error ? "" : "none" }}
                            >
                                <h4>{error}</h4>
                            </div>

                    }
                    {
                        () =>
                            <div className="alert alert-info mt-3"
                                style={{ display: loading ? "" : "none" }}
                            >
                                <h4>Loading...</h4>
                            </div>
                    }
                    {
                        () => success ? <Redirect to="/user/dashboard" /> : <></>
                    }
                </div>
            </div>
        </Base>
    )
}

export default UpdateStockInfo
