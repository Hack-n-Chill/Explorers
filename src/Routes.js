import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Core/Home'
import SignUp from './user/SignUp'
import SignIn from './user/SignIn'
import UserDashBoard from './user/UserDashBoard'
import PrivateRoute from './config/PrivateRoute'
import UpdateStockInfo from './user/UpdateStockInfo'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={SignUp} />
                <Route path="/signin" exact component={SignIn} />
                <PrivateRoute path="/user/dashboard" exact component={UserDashBoard} />
                <PrivateRoute path="/user/update/:stockId" exact component={UpdateStockInfo} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes
