import React, { FC } from 'react'
import Button from '../common/Button'
import Card from '../common/Card'
import Modal from '../common/Modal'

interface Props {
    handleDecline: () => void,
    handleAccept: () => void,
    opUser: any,
}

const InviteCard:FC<Props> = ({handleDecline, handleAccept, opUser}) => {
  return (
    <Modal>
        <Card
            title={`Game Invitation`}
            handleCancel={handleDecline}
            icon="fa-solid fa-envelope text-[1.5rem]"
            MainButton={
                <Button color='bg-my-yellow' handleClick={handleAccept}>
                    <p>Accept</p>
                </Button>
            }
            SecondaryButton={
                <Button color='bg-gray-200' handleClick={handleDecline}>
                    <p>Decline</p>
                </Button>
            }
            
        >
            <div className="flex flex-col items-center my-4">
                <img src={opUser.avatar} alt="avatar" className="w-[7rem] rounded-full" />
                <p className="my-4"><span className="font-extrabold text-xl">{opUser.username}</span> challenged you</p>
            </div>
        </Card>
    </Modal>
  )
}

export default InviteCard