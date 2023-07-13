import React from "react";
import "../../assets/style/home.css"
type ErrorProps = {
    errorMessage: string;
}

const ErrorComponent = (props: ErrorProps) => {
    return (
        <div className='fontStyles cardParent'>
            <h1>{props.errorMessage}</h1>
        </div>
    )
}

export default ErrorComponent;