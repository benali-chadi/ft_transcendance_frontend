import React from "react";

const UserCard = ({image, username, level}) => {
    return ( 
        <div className="flex gap-4">
            <div className="min-h-[4rem] min-w-[4rem] rounded-full bg-gray-300">
                {image}
            </div>
            <div className="text-left">
                <h3 className="text-xl">{username}</h3>
                <div className="text-lg">{level}</div>
            </div>
        </div>
    );
}
 
export default UserCard;