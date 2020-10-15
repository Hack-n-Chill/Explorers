import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import auth from '../config/auth'

const NavBar = () => {
    const [user] = useAuthState(auth)
    const searchButtonPressed = () => {
        
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand font-weight-bold">NavBar LOGO</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbat-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <div className="navbar-nav mr-auto"></div>
                <form className="form-inline my-2 my-lg-0 ml-auto">
                    {
                        user ? (
                            <>
                                <input className="form-control mr-sm-2" type="search" placeholder="Search Your Stock" aria-label="Search" />
                                <button className="btn btn-light my-2 my-sm-0" type="button" onClick={searchButtonPressed} >Search</button>
                            </>
                        ) : (
                                <>
                                    <Link to="/signup"><button type="button" className="btn btn-outline-success mx-3" >SignUp <i class="fas fa-user-plus"></i> </button></Link>
                                    <Link to="/signin"><button type="button" className="btn btn-outline-danger mx-3" >SignIn <i class="fas fa-user-check" ></i> </button></Link>
                                </>
                            )
                    }
                </form>
            </div>
        </nav>
    )
}

export default NavBar
