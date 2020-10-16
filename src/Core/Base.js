import React from 'react'
import "./Base.css";
import Footer from './Footer';
import NavBar from './NavBar';

const Base = ({
    title,
    description,
    className,
    children
}) => {
    return (
        <div>
            <div className="mb-5 fixed-top">
                <div className="text-center bg-dark">
                    <div className="titleBar my-2 text-white">{title}</div>
                    <p className="lead my-1 text-white my-2">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
            <Footer />
        </div>

    )
}

export default Base
