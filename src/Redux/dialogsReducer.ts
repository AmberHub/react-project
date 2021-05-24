import { dialogsAPI } from "../API/api"
import { DialogType, MessageType } from "../utils/types"

const ADD_MESSAGE = "ADD_MESSAGE";
const GET_DIALOGS_NAMES_SUCCESS = "GET_DIALOGS_NAMES_SUCCESS";
const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
const FETCHING = "FETCHING";
const FILTER_MESSAGES_SUCCESS = "FILTER_MESSAGES_SUCCESS";
const CHECK_NEW_DIALOGS_SUCCESS = "CHECK_NEW_DIALOGS_SUCCESS";


type AddMessageACType = {
	type : typeof ADD_MESSAGE
	data : MessageType
}
export let addMessage = (data: MessageType): AddMessageACType => ({ type : ADD_MESSAGE, data });


type FetchingACType = {
	type : typeof FETCHING
}
export let fetching = (): FetchingACType => ({type : FETCHING});


type GetMessagesSuccessACType = {
	type : typeof GET_MESSAGES_SUCCESS
	data : Array<MessageType>
}
export let getMessagesSuccess = (data: Array<MessageType>): GetMessagesSuccessACType => ({type : GET_MESSAGES_SUCCESS, data});


type GetDialogsNamesSuccessACType = {
	type : typeof GET_DIALOGS_NAMES_SUCCESS
	data : Array<DialogType>
}
export let getDialogsNamesSuccess = (data: Array<DialogType>): GetDialogsNamesSuccessACType => ({type : GET_DIALOGS_NAMES_SUCCESS, data});


type FilterMessagesSuccessACType = {
	type : typeof FILTER_MESSAGES_SUCCESS
	data : Array<MessageType>
}
export let filterMessagesSuccess = (data: Array<MessageType>): FilterMessagesSuccessACType => ({type : FILTER_MESSAGES_SUCCESS, data});


type CheckNewDialogsSuccessACType = {
	type : typeof CHECK_NEW_DIALOGS_SUCCESS
	count : number
}
export let checkNewDialogsSuccess = (count: number): CheckNewDialogsSuccessACType => ({type : CHECK_NEW_DIALOGS_SUCCESS, count});




type initialStateType = typeof initialState;

type actionsType = AddMessageACType | FetchingACType | GetMessagesSuccessACType |
	GetDialogsNamesSuccessACType | FilterMessagesSuccessACType | CheckNewDialogsSuccessACType

let initialState = {
	DialogMessageItems : [] as Array<MessageType>,
	DialogItem : null as Array<DialogType> | null,
	FilteredMessages : null as Array<any> | null,
	newDialogsCount : null as number | null,
	isFetching : false
}


const dialogsReducer = (state=initialState, action: actionsType): initialStateType => {

	switch (action.type) {

		case ADD_MESSAGE :
		return {...state,
				DialogMessageItems: [...state.DialogMessageItems,
				{...action.data}]}

		case GET_MESSAGES_SUCCESS :
		return  {...state, DialogMessageItems : action.data}
		
		case GET_DIALOGS_NAMES_SUCCESS :
		return { ...state, DialogItem : action.data}

		case FETCHING :
		return {...state, isFetching : !state.isFetching}

		case FILTER_MESSAGES_SUCCESS :
		return {...state, FilteredMessages : action.data}

		case CHECK_NEW_DIALOGS_SUCCESS :
		return {...state, newDialogsCount : action.count}

		default : return state;
	}

};

export let getDialogsNamesTC = () => async (dispatch: Function) => {
	dispatch(fetching())
	let data = await dialogsAPI.getDialogsNames()
	dispatch(getDialogsNamesSuccess(data))
	dispatch(fetching())
}

export let startChattingTC = (userId: number) => async (dispatch: Function) => {
	let data = await dialogsAPI.startChatting(userId)
		if(data.resultCode === 0) {
			//dispatch(startChattingSuccess())
		}
}

export let getMessagesListTC = (userId: number) => async (dispatch: Function) => {
	dispatch(fetching())
	let data = await dialogsAPI.getMessagesList(userId)
		dispatch(getMessagesSuccess(data))
	dispatch(fetching())
}

export let sendMessageTC = (userId: number, message: string) => async (dispatch: Function) => {
	let data = await dialogsAPI.sendMessage(userId, message)
	if(data.resultCode === 0) {
		dispatch(addMessage(data.data))
	}
	
}

export let messageIsViewedTC = (messageId: string) => async (dispatch: Function) => {
	let data = await dialogsAPI.messageIsViewed(messageId)
	//dispatch()
}

export let messageToSpamTC = (messageId: string) => async (dispatch: Function) => {
	let data = await dialogsAPI.messageToSpam(messageId)
	//dispatch()
}

export let deleteMessagTC= (messageId: string) => async (dispatch: Function) => {
	let data = await dialogsAPI.deleteMessage(messageId)
	//dispatch()
}

export let restoreMessageTC = (messageId: string) => async (dispatch: Function) => {
	let data = await dialogsAPI.restoreMessage(messageId)
	//dispatch()
}

export let filterMessageTC = (userId: number, date: string) => async (dispatch: Function) => {
	let data = await dialogsAPI.filterMessage(userId, date)
	debugger
	dispatch(filterMessagesSuccess(data))
}

export let checkNewDialogsTC = () => async (dispatch: Function) => {
	let count = await dialogsAPI.checkNewDialog();
	dispatch(checkNewDialogsSuccess(count))
}

export default dialogsReducer;