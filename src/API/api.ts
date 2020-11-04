import axios from "axios";
import { API_KEY } from "../API_KEY";
import {DialogType, MessageType, PhotosType, ProfileDataType, UsersType} from "../utils/types";

let instance = axios.create({
	withCredentials : true,
	headers : {
		"API-KEY" : API_KEY
	},
	baseURL : `https://social-network.samuraijs.com/api/1.0/`
})

type CommonResponseType = {
	resultCode: number
	messages: Array<string>
	data: Object
}

type isAuthDataType = {
	resultCode: number
	messages: Array<string>
	data: {
		id: number
		email: string
		login: string
	}
}

type LoginDataType = {
	resultCode: number
	messages: Array<string>
	data: {
		userId: number
	}
}

type PhotosDataType = {
	resultCode: number
	messages: Array<string>
	data: {
		photos: PhotosType
	}
}

export type UsersDataType = {
	items : Array<UsersType> | null
	totalCount : number
	error : string | null
}

type MessageDataType = {
	items : Array<MessageType>
}

type CaptchaDataType = {
	url : string
}

export const userAPI = {

	unfollow(userId: number) {
		return instance.delete<CommonResponseType>(`follow/${userId}`).then( response => response.data )
	},

	follow(userId : number) {
		return instance.post<CommonResponseType>(`follow/${userId}`).then( response => response.data )
	},

	setUsers(page : number, count : number, term?: string) {
		return instance.get<UsersDataType>(`users?page=${page}&count=${count}`).then( response => response.data )
	}
}

export const authAPI = {
	isAuthed() {
		return instance.get<isAuthDataType>(`auth/me`).then( response => response.data )
	},

	login( email: string | null, password: string| null, rememberMe: boolean, captcha?: string ) {
		return instance.post<LoginDataType>(`auth/login`, { email, password, rememberMe, captcha }).then( response => response.data )
	},

	logout() {
		return instance.delete<CommonResponseType>(`auth/login`).then( response => response.data )
	}
}

export const profileAPI = {
	setProfile(userId: number | null) {
		return instance.get<ProfileDataType>(`profile/${userId}`).then( response => response.data )
	},

	updateProfile(values: Object) {
		return instance.put<CommonResponseType>(`profile`, values).then( response => response.data )
	},

	getStatus(userId: number) {
		return instance.get<string>(`profile/status/${userId}`).then( response => response.data )
	},

	updateStatus(status: string) {
		return instance.put<CommonResponseType>(`profile/status`, { status }).then( response => response.data )
	},

	updatePhoto(photo: File) {
		const formData = new FormData();
		formData.append("image", photo);
		return instance.put<PhotosDataType>(`profile/photo`, formData, {
			headers : {
				"Content-Type" : "multipart/form-data"
			}
		}).then( response => response.data )
	},

	getPhoto(myId: number) {
		return instance.get<ProfileDataType>(`profile/${myId}`).then( response => response.data.photos )
	}
}


export const dialogsAPI = {

	getDialogsNames() {
		return instance.get<Array<DialogType>>(`dialogs`).then( response => response.data )
	},

	startChatting(userId: number) {
		return instance.put(`dialogs/${userId}`).then( response => response.data )
	},

	getMessagesList(userId: number) {
		return instance.get<MessageDataType>(`dialogs/${userId}/messages`).then( response => response.data.items )
	},

	sendMessage(userId: number, message: string) {
		return instance.post(`dialogs/${userId}/messages`, {body : message}).then( response => response.data )//without data
	},

	messageIsViewed(messageId: string) {
		return instance.get<boolean>(`dialogs/messages/${messageId}/viewed`).then( response => response.data )
	},

	messageToSpam(messageId: string) {
		return instance.post(`dialogs/messages/${messageId}/spam`).then( response => response.data )
	},

	deleteMessage(messageId: string) {
		return instance.delete(`dialogs/messages/${messageId}`).then( response => response.data )
	},

	restoreMessage(messageId: string) {
		return instance.put(`dialogs/messages/${messageId}/restore`).then( response => response.data )
	},

	filterMessage(userId: number, date: string) {
		return instance.get(`dialogs/${userId}/messages/new?newerThen=${date}`).then( response => response.data )
	},

	checkNewDialog() {
		return instance.get(`dialogs/messages/new/count`).then( response => response.data )
	}
}

export const securityAPI = {
	getCaptcha() {
		return instance.get<CaptchaDataType>("security/get-captcha-url").then( response => response.data )
	}
}

export const friendsAPI = {
	requestFriends(page : number, count : number, searchName?: string) {
		return instance.get<UsersDataType>(`users?page=${page}&count=${count}&friend=true&term=${searchName ? searchName : ""}`).then( response => response.data )
	}
}