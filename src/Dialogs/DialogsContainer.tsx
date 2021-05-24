import React, { useEffect } from 'react'
import Dialogs from "./Dialogs"
import {connect} from "react-redux"
import { withAuth } from "../HOC/AuthHOC"
import { compose } from "redux"
import { getIsAuth } from "../Selectors/authSelectors"
import { getDialogItem, getIsFetching } from "../Selectors/dialogSelectors"
import { getDialogsNamesTC } from "../Redux/dialogsReducer"
import { DialogType, AppStateType } from "../utils/types"
import Preloader from "../utils/Preloader";

type PropsType = ConnectedPropsType & DispatchPropsType & OwnPropsType

	

type ConnectedPropsType = {
	DialogItem : Array<DialogType> | null
	isFetching : boolean
}

type DispatchPropsType = {
	getDialogsNamesTC : () => void
}

type OwnPropsType = {

}

type ConnectedPropsForAuthType = {
	isAuth: boolean
}

type DispatchPropsForAuthType = {
	
}

const DialogsContainer: React.FC<PropsType> = ({getDialogsNamesTC, isFetching, ...props}) => {

	useEffect( () => {
		getDialogsNamesTC();
	}, []);

	return <> { isFetching ? <Preloader />
	: <Dialogs {...props} /> }
	</>
};


let mapStateToProps = (state: AppStateType): ConnectedPropsType => ({
	DialogItem : getDialogItem(state),
	isFetching : getIsFetching(state)
})

let authMapStateToProps = (state: AppStateType) => ({
    isAuth : getIsAuth(state)
})

export default compose(
	connect<ConnectedPropsForAuthType, DispatchPropsForAuthType, OwnPropsType, AppStateType>(authMapStateToProps, { }),
	withAuth,
	connect<ConnectedPropsType, DispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, { getDialogsNamesTC })
	)(DialogsContainer);