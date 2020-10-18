import { rootReducerType } from "../Redux/redux-store"

export type AppStateType = ReturnType<rootReducerType>

export type PhotosType = {
	large : string | null
	small : string | null
}

export type ProfileDataType = {
	userId: number
	lookingForAJob: boolean
	lookingForAJobDescription: string | null
	fullName: string
	aboutMe : string | null
	contacts: contactsType
	photos?: PhotosType
}

export type PostDataType = {
	post: string
	id : number
}

export type contactsType = {
	[github : string]: string | null
	vk: string | null
	facebook: string | null
	instagram: string | null
	twitter: string | null
	website: string | null
	youtube: string | null
	mainLink: string | null
}

export type DialogType = {
	id: number
	userName: string
	hasNewMessages: boolean
	lastDialogActivityDate: string
	lastUserActivityDate: string
	newMessagesCount: number
	photos: PhotosType
}

export type MessageType = {
	id?: string
	body: string
	translatedBody?: string | null
	addedAt?: string
	senderId: number
	senderName?: string
	recipientId?: number
	viewed?: boolean
}

export type UsersType =  {
    name: string
    id: number
    photos: PhotosType
    status: string | null
    followed: boolean
}
///////////////////////////////
export type MatchType ={
	url : string
	path: string
	isExact : boolean
	params : ParamsType
}  

type ParamsType = {
	userId? : number
}
/////////////////////////////////

