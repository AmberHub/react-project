import { AppStateType } from "./../utils/types"

export let getNewDialogsCount = (state: AppStateType) => {
	return state.Dialog.newDialogsCount
}