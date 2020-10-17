import React, { useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Link } from 'react-router-dom'
import auth from '../config/auth'
import NavBarLogo from '../Assets/logoMainWhite.svg'
import { addStock } from '../config/UserAPICall'
import { Alert } from 'react-bootstrap'

const NavBar = () => {
    const [user] = useAuthState(auth)
    const [success, setSuccess] = useState(false) // success and error can be there but, doesn't make sense as of now.
    const [searchValue, setSearchValue] = useState("")

    const searchButtonPressed = () => {
        console.log("search button pressed");
        console.log("value present in search box is: " + searchValue);
        addStock(user, searchValue).then(res => {
            if (res.err) {

            } else {
                setSearchValue("")
            }
        }
        ).catch(err => console.log(err))
        // I know the above method is not gonna work now.
        setSearchValue("") // comment this line after fetching the api.
    }
    const handleChange = name => event => {
        setSearchValue(event.target.value)
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/" className="navbar-brand font-weight-bold navbar-elements"><img src={NavBarLogo} alt="NavBarLogo" height="45" width="45"/></Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbat-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <div className="navbar-nav mr-auto"></div>
                <form className="form-inline my-2 my-lg-0 ml-auto">
                    {
                        user ? (
                            <>
                                <input className="form-control mr-sm-2" type="search" placeholder="Search Your Stock" aria-label="Search" value={searchValue} onChange={handleChange("searchBarValue")}/>
                                <button className="btn btn-light my-2 my-sm-0 font-weight-bold searchButton" type="button" onClick={()=>searchButtonPressed()} >Add to Watch List</button>
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
