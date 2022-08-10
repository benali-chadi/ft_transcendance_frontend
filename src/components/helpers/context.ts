import { Socket } from "dgram";
import { createContext } from "react";

// User Context

export interface UserState {
	currentUser: any,
	setCurrentUser: React.Dispatch<React.SetStateAction<any>> | (() => void),
	isMobile: boolean,
	userSocket?: Socket | null,
	chatSocket?: Socket | null,
	gameSocket?: Socket | null,
	updated: number,
	updatedRelation :number,
	room_notif: number,
	setNotif: React.Dispatch<React.SetStateAction<number>> | (() => void),

}

const initialState: UserState = {
	currentUser: null,
	setCurrentUser: () => {},
	isMobile: false,
	userSocket: null,
	updated :0,
	updatedRelation:0,
	chatSocket : null,
	gameSocket : null,
	room_notif: 0,
	setNotif: () => {}
}

export const userContext = createContext<UserState>(initialState);

// Chat Context

export interface ChatState {
	channels: any,
	setChannels: React.Dispatch<React.SetStateAction<any>> | (() => void),
	channelUpdated: number,
	setcChannelUpdated: React.Dispatch<React.SetStateAction<number>> | (() => void),
}

const initialChatUserState: ChatState = {
	channels: null,
	setChannels: () => {},
	channelUpdated: 0,
	setcChannelUpdated: ()=>{}
}

export const ChatContext = createContext<ChatState>(initialChatUserState)
