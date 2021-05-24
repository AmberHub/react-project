import React, {useEffect} from 'react'
import {withRouter} from "react-router-dom"
import Messages from "./Messages"
import { connect } from "react-redux"
import { withAuth } from "../../HOC/AuthHOC"
import { compose } from "redux"
import { reset } from "redux-form"
import Preloader from "../../utils/Preloader"
import { getIsAuth, getUserId } from "../../Selectors/authSelectors"
import { getDialogMessageData, getIsFetching } from "../../Selectors/dialogSelectors"
import { sendMessageTC, getMessagesListTC,
startChattingTC, addMessage } from "../../Redux/dialogsReducer"
import { AppStateType, MessageType } from "../../utils/types"


type PropsType = ConnectedPropsType & OwnPropsType & DispatchPropsType

type ConnectedPropsType = {
	isFetching : boolean
	MessageItem : Array<MessageType> | null
	myId : number | null
}

type ConnectedPropsForAuthType = {
	isAuth : boolean
}

type OwnPropsType = {
	match : any
}

type DispatchPropsType = {
	getMessagesListTC : (userId : number) => void
	sendMessageTC : (userId : number, values: string) => void
	startChattingTC : (userId : number) => void
	reset : (formName : string) => void
	addMessage: (data: MessageType) => void
}

type DispatchPropsForAuthType = {
	
}



export type ValuesType = {
	message : string
}



const MessagesContainer: React.FC<PropsType> = ({isFetching, reset, startChattingTC, sendMessageTC, getMessagesListTC, ...props}) => {

	useEffect( () => {
		getMessagesListTC(props.match.params.userId)
	},[])

	let onSubmit = (values: ValuesType) => {
		sendMessageTC(props.match.params.userId, values.message)
		startChattingTC(props.match.params.userId)
		reset("messageForm")
}

		return <>{ isFetching ? <Preloader />
			: <Messages {...props} onSubmit={onSubmit} />
		} </>
};

let mapStateToProps = (state: AppStateType): ConnectedPropsType => ({
    MessageItem : getDialogMessageData(state),
    isFetching : getIsFetching(state),
    myId : getUserId(state)
});

let authMapStateToProps = (state: AppStateType): ConnectedPropsForAuthType => ({
    isAuth : getIsAuth(state)
});

export default compose(
	connect<ConnectedPropsType, DispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
		{ addMessage, reset, sendMessageTC, getMessagesListTC, startChattingTC }),
	connect<ConnectedPropsForAuthType, DispatchPropsForAuthType, OwnPropsType, AppStateType>(authMapStateToProps, { }),
	withRouter,
	withAuth
	)(MessagesContainer);