import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Core/Home'
import SignUp from './User/SignUp'
import SignIn from './User/SignIn'
import UserDashBoard from './User/UserDashBoard'
import PrivateRoute from './config/PrivateRoute'
import CreateWatchList from './User/CreateWatchList'
import UpdateStockInfo from './User/UpdateStockInfo'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                <PrivateRoute path="/user/create/watchlist" exact component={CreateWatchList} />
                <PrivateRoute path="/user/update/:stockId/:userId" exact component={UpdateStockInfo} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
