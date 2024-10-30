import React from "react";

const HandleError = ({message}) =>{
    return(
        <>
            <h1 className="text-center">Error:</h1>
            <p className= "text-center">{message}</p>
        </>
    )
}

export default HandleError;