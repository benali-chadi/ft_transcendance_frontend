import { createContext } from "react";

export interface UserState {
	currentUser: any,
	setUser: React.Dispatch<React.SetStateAction<any>> | (() => void),
	isMobile: boolean
}

const initialState: UserState = {
	currentUser: null,
	setUser: () => {},
	isMobile: false
}

export const userContext = createContext<UserState>(initialState);
