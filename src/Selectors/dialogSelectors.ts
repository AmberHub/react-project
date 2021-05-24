import { AppStateType } from "../utils/types"

export const getDialogItem = (state: AppStateType) => {
	return state.Dialog.DialogItem
}

export const getDialogMessageData = (state: AppStateType) => {
	return state.Dialog.DialogMessageItems
}

export const getIsFetching = (state: AppStateType) => {
	return state.Dialog.isFetching
}

export const getFilteredMessages = (state: AppStateType) => {
	return state.Dialog.FilteredMessages
}