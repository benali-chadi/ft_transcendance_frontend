import React from "react";

const List = ({icon, title, children}) => {
    return ( 
        <div className="rounded-med min-w-[15rem]">
            <div className="w-full bg-my-violet p-4 px-7 rounded-t-med flex gap-4">
                <i className={`${icon} text-my-yellow self-center`}></i>
                <h2 className="text-white font-bold text-2xl uppercase ">{title}</h2>
            </div>
            <div className="w-full min-h-[2rem] bg-my-dark-lavender">
                {children}
            </div>
        </div>
    );
}
 
export default List;