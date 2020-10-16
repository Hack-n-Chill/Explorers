import React from 'react'
import auth from '../config/auth'

const Footer = ({
    userPresent=false
}) => {
    return (
        <div className="fixed-bottom">
            <div className="card text-center text-white bg-dark">
                <div className="card-header font-weight-bolder">
                    The Explorers
            </div>
                <div className="card-body">
                    <p className="card-text font-italic">Be fearful when others are greedy and greedy when others are fearful. </p>
                    <h5 className="card-title font-weight-bolder">Warren Buffet</h5>
                    {
                        userPresent ?
                            <button className="btn btn-danger btn-lg"
                                onClick={
                                    () => auth.signOut()
                                }
                            >
                                LogOut
                                </button>
                            :
                            <></>
                    }
                </div>
            </div>
        </div>
    )
}

export default Footer
