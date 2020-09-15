import React, {useEffect} from "react";
import {connect} from "react-redux";
import {changePortion ,follow, requestUsers, changePage, requestTotalCountPage,
 fetching, following} from "./../Redux/actionCreators.js";
import Users from "./Users.jsx";
import Preloader from "./../utils/Preloader.jsx";
import { setUsersTC, followTC, changePageTC } from "./../Redux/usersReducer.js";
import { compose } from "redux";
import { withAuth } from "./../HOC/AuthHOC.jsx";
import { getUsers, getPage, getCount,
getTotalCountPage, getCurrentPage, getIsFetching,
getFollowInProgres, getCurrentPortion } from "./../Selectors/usersSelectors.js";

const UsersContainer = (props) => {

	useEffect( () => {
		props.setUsersTC(props.page, props.count)
	}, [])
		

	let changePage = (p) => {
		props.changePageTC( p, props.count)
	}

	return <> {props.isFetching ? <Preloader /> : 
		<Users 	{...props} changePage={changePage}/>} </>
};

let mapStateToProps = (state) => ({
	users : getUsers(state),
	page: getPage(state),
	count: getCount(state),
	totalCountPage : getTotalCountPage(state),
	currentPage : getCurrentPage(state),
	isFetching: getIsFetching(state),
	followInProgres : getFollowInProgres(state),
	currentPortion : getCurrentPortion(state)
});

let authMapStateToProps = (state) => ({
		isAuth : state.Auth.isAuth
})


export default compose( 
	connect(authMapStateToProps, { }),
	withAuth,
	connect(mapStateToProps, {
	follow, requestUsers, changePage, changePortion,
	requestTotalCountPage, fetching, following,
	setUsersTC, followTC, changePageTC
	})
	) (UsersContainer) ;