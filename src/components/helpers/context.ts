import { Socket } from "dgram";
import { createContext } from "react";

// User Context

export interface UserState {
	currentUser: any,
	setCurrentUser: React.Dispatch<React.SetStateAction<any>> | (() => void),
	isMobile: boolean,
	userSocket?: Socket | null,
}

const initialState: UserState = {
	currentUser: null,
	setCurrentUser: () => {},
	isMobile: false,
	userSocket: null
}

export const userContext = createContext<UserState>(initialState);

// Chat Context

export interface ChatState {
	channels: any,
	setChannels: React.Dispatch<React.SetStateAction<any>> | (() => void),
}

const initialChatUserState: ChatState = {
	channels: null,
	setChannels: () => {}
}

export const ChatContext = createContext<ChatState>(initialChatUserState)
