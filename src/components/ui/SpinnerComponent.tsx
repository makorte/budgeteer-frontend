import React from "react";

const SpinnerComponent = () => {
    return (
        <div className="m-5 d-flex justify-content-center text text-primary" data-testid={"spinner"}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default SpinnerComponent
