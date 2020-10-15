import React from 'react'
import "./Base.css";

const Base = ({
    title,
    description,
    className,
    children
}) => {
    return (
        <div>
            <div className="container-fluid">
                <div className="jumbotron text-dark text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={className}>{children}</div>
            </div>
        </div>

    )
}

export default Base
