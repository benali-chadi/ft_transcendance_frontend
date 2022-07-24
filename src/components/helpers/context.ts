import { createContext } from "react";

export interface UserState {
	user: any,
	setUser: React.Dispatch<React.SetStateAction<any>> | (() => void),
	isMobile: boolean
}

const initialState: UserState = {
	user: null,
	setUser: () => {},
	isMobile: false
}

export const userContext = createContext<UserState>(initialState);
