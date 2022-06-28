import React from "react";
import Button from "./common/Button";
import Card from "./common/Card";
import Modal from "./common/Modal";

const SignUp = ({handleCancelClick, handleSaveClick}) => {
    return (
        <Modal>
            <Card
                title="Sign Up"
                icon="fa-solid fa-right-to-bracket"
                MainButton={
                    <Button color="bg-my-yellow" hoverColor="bg-yellow-300" handleClick={handleSaveClick}>
                        Save
                    </Button>
                }
                SecondaryButton={
                    <Button color="bg-gray-200" hoverColor="bg-white" handleClick={handleCancelClick}>
                        Cancel
                    </Button>
                }
            >
                <div className="flex flex-col justify-between gap-4 items-center">
                    {/* Avatar */}
                    <div className="h-[7rem] w-[7rem] rounded-full bg-gray-500"></div>
                    <input type="text" placeholder="Choose Your Username" className="rounded-large h-10 border-black border-[1px] px-3 font-Poppins" />
                </div>
            </Card>
        </Modal>
    );
}
 
export default SignUp;