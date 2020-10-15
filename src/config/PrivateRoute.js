import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import auth from './auth';
import {Route, Redirect} from 'react-router-dom'

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [user] = useAuthState(auth);
    return (
        <Route
            {...rest}
            render={props =>
                user ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    )
}

export default PrivateRoute
