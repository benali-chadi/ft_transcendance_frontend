import React from "react";

const Button = ({children, handleClick}) => {
    return ( 
        <div className="h-1/6 max-h-20 min-h-max max-w-md w-1/2 bg-my-yellow rounded-large flex justify-center items-center border-b-2 border-black cursor-pointer hover:bg-yellow-300" onClick={handleClick}>
            {children}
        </div>
    );
}
 
export default Button;