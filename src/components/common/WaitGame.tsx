import React, { FC, useContext, useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import Card from "./Card";
import Button from "./Button";
import { userContext, UserState } from "../helpers/context";
import { useNavigate } from "react-router-dom";

interface Props {
    cancel : () => void;
}

const WaitGame: FC<Props> = ({cancel}) =>{

    const {gameSocket} = useContext<UserState>(userContext);
    const ref = useRef(false);
    const navigate = useNavigate();

    const handleCancel = () =>{
        ref.current = true;
        gameSocket?.emit("unsubscribe");
        cancel();
    }
    useEffect(()=>{
        gameSocket?.on("GameReady", (data)=>{
            navigate(`/game?room=${data.room}`)
        })
    })
    return (
        <Modal>
            <Card 
            title="Waiting for adversary"
            handleCancel={handleCancel}
            icon=""
            SecondaryButton={
                <Button color='bg-gray-200' handleClick={handleCancel}>
                    <p>Cancel</p>
                </Button>
            }
            MainButton=""
            >
            </Card>
        </Modal>
    )
}

export default WaitGame;