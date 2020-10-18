import React, {useEffect} from "react"
import {connect} from "react-redux"
import {changePortion, follow, requestUsers, changePage, requestTotalCountPage,
 fetching, following, setUsersTC, followTC, changePageTC} from "../Redux/usersReducer"
import Users from "./Users"
import Preloader from "../utils/Preloader.js"
import { compose } from "redux"
import { withAuth } from "../HOC/AuthHOC"
import { getUsers, getPage, getCount,
getTotalCountPage, getCurrentPage, getIsFetching,
getFollowInProgress, getCurrentPortion } from "../Selectors/usersSelectors"
import { getIsAuth } from "../Selectors/authSelectors"
import { UsersType, AppStateType } from "../utils/types"



type PropsType = ConnectedPropsType & DispatchPropsType & OwnPropsType

type ConnectedPropsType = {
	users : Array<UsersType>
	page: number
	count: number
	totalCountPage : number
	currentPage : number
	isFetching: boolean
	followInProgress : Array<number>
	currentPortion : number
}

type ConnectedPropsForAuthType = {
	isAuth : boolean
}

type DispatchPropsType = {
	setUsersTC : (page: number, count: number) => void
	changePageTC : (page: number, count: number) => void
	requestUsers : (newUsers : Array<UsersType>) => void
	changePage : (page : number) => void
	changePortion : () => void
	requestTotalCountPage : () => void
	fetching : () => void
	following : () => void
	followTC : () => void
}

type OwnPropsType = {
	follow : (userId : number) => void
}

type DispatchPropsForAuthType = {

}


const UsersContainer: React.FC<PropsType> = ({page, count, setUsersTC, changePageTC, isFetching, ...props}) => {

	useEffect( () => {
		setUsersTC(page, count)
	}, [])
		

	let changePage = ( page: number ) => {
		changePageTC( page, count)
	}

	return <> {isFetching ? <Preloader /> : 
		<Users 	{...props} changePage={changePage}
							count={count}/>} </>
};

let mapStateToProps = (state: AppStateType): ConnectedPropsType => ({
	users : getUsers(state),
	page: getPage(state),
	count: getCount(state),
	totalCountPage : getTotalCountPage(state),
	currentPage : getCurrentPage(state),
	isFetching: getIsFetching(state),
	followInProgress : getFollowInProgress(state),
	currentPortion : getCurrentPortion(state)
});

let authMapStateToProps = (state: AppStateType): ConnectedPropsForAuthType => ({
		isAuth : getIsAuth(state)
})


export default compose( 
	connect(mapStateToProps, 
	{ follow, requestUsers, changePage, changePortion,
	requestTotalCountPage, fetching, following,
	setUsersTC, followTC, changePageTC
	}),
	connect<ConnectedPropsForAuthType, DispatchPropsForAuthType, OwnPropsType, AppStateType>(authMapStateToProps, { }),
	withAuth
	) (UsersContainer) ;