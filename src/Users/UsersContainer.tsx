import React, {ChangeEvent, useEffect, useState} from "react"
import {connect} from "react-redux"
import {changePortion, requestUsers, changePage, requestTotalCountPage,
 fetching, following, setUsersTC, followTC} from "../Redux/usersReducer"
import Users from "./Users"
import Preloader from "../utils/Preloader"
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
	setUsersTC : (page: number, count: number, isFetching: boolean, isChangingPage : boolean, term?: string) => void
	requestUsers : (newUsers : Array<UsersType>) => void
	changePage : (page : number) => void
	changePortion : () => void
	requestTotalCountPage : () => void
	fetching : () => void
	following : () => void
	followTC : (followed : boolean, id : number, isFriendsPage?: boolean) => void
	searchUsers : (element : ChangeEvent<HTMLInputElement>) => void
}

type OwnPropsType = {

}

type DispatchPropsForAuthType = {

}


const UsersContainer: React.FC<PropsType> = ({page, count, setUsersTC, isFetching, followTC, ...props}) => {

	useEffect( () => {
		setUsersTC(1, count, true, false)
		changePage(1)
	}, [])

	let [valueOfSearch, setValueOfSearch] = useState("")

	let changePage = ( page: number ) => {
		setUsersTC( page, count, true, true, valueOfSearch)
	}

	let searchUsers = (element : ChangeEvent<HTMLInputElement>) => {
		setValueOfSearch(element.target.value)
		setUsersTC(1, count, false, false, element.target.value)
	}

	let follow = (followed: boolean, id: number) => {
		followTC(followed, id, false)
	}

	return <> {isFetching ? <Preloader /> : 
		<Users 	{...props}
				  changePage={changePage}
				  count={count}
				  searchUsers={searchUsers}
				  valueOfSearch={valueOfSearch}
				  follow={follow}
				  page={page}/>} </>
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
	connect<ConnectedPropsForAuthType, DispatchPropsForAuthType, OwnPropsType, AppStateType>(authMapStateToProps, { }),
	withAuth,
	connect(mapStateToProps,
		{ requestUsers, changePage, changePortion,
			requestTotalCountPage, fetching, following,
			setUsersTC, followTC
		})
	) (UsersContainer) ;