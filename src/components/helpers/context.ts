import { createContext } from "react";

export interface UserState {
	currentUser: any,
	setCurrentUser: React.Dispatch<React.SetStateAction<any>> | (() => void),
	isMobile: boolean
}

const initialState: UserState = {
	currentUser: null,
	setCurrentUser: () => {},
	isMobile: false
}

export const userContext = createContext<UserState>(initialState);
