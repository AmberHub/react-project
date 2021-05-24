import React, { useEffect } from 'react'
import Header from "./Header"
import { connect } from "react-redux"
import { isAuthTC, logoutTC } from "../Redux/authReducer"
import { getIsAuth, getLogin, getUserId } from "../Selectors/authSelectors"
import { AppStateType } from "../utils/types"


type PropsType = ConnectedPropsType & OwnPropsType & DispatchPropsType

type ConnectedPropsType = {
	isAuth: boolean
	login: string | null 
	userId: number | null
}

type OwnPropsType = {

}

type DispatchPropsType = {
	isAuthTC : () => void
	logoutTC : () => void
}



const HeaderAPI: React.FC<PropsType> = ({isAuthTC, ...props}) => {

	useEffect( () => {
		isAuthTC();
	}, [])

	return <Header { ...props } />
}

let mapStateToProps = (state: AppStateType) => ({
	isAuth: getIsAuth(state),
	login: getLogin(state),
	userId: getUserId(state)
})


export default connect<ConnectedPropsType, DispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps,
	{ isAuthTC, logoutTC })(HeaderAPI);