import React from "react";
import {connect} from "react-redux";
import {follow, updateUsers, changePage, getTotalCountPage,
 fetching, following} from "./../Redux/actionCreators.js";
import Users from "./Users.jsx";
import Preloader from "./../Preloader.jsx";
import { setUsersTC, followTC, changePageTC } from "./../Redux/usersReducer.js";
import { compose } from "redux";
import { withAuth } from "./../HOC/AuthHOC.jsx";

class UsersAPI extends React.Component {

	componentDidMount = () => {
		this.props.setUsersTC(this.props.page, this.props.count)
		}

	changePage = (p) => {
		this.props.changePageTC( p, this.props.count)
		}

	render = () => {
		let pageCount = Math.ceil(this.props.totalCountPage / this.props.count);

		let pages = [];

		for( let i = 1; i <= pageCount; i++) {
			pages.push(i);
		}
		
		return <> {this.props.isFetching ? <Preloader /> : 
			<Users pages={pages}
					users={this.props.users}
					follow={this.props.follow}
					changePage={this.changePage}
					currentPage={this.props.currentPage}
					totalCountPage={this.props.totalCountPage}
					following={this.props.following}
					followInProgres={this.props.followInProgres}
					followTC={this.props.followTC}/>} </>
	}
};

let mapStateToProps = (state) => {
	return{	
	users : state.UsersPage.users,
	page: state.UsersPage.page,
	count: state.UsersPage.count,
	totalCountPage : state.UsersPage.totalCountPage,
	currentPage : state.UsersPage.currentPage,
	isFetching: state.UsersPage.isFetching,
	followInProgres : state.UsersPage.followInProgres
	}
};

let authMapStateToProps = (state) => {
	return {
		isAuth : state.Auth.isAuth
	}
}


export default compose( 
	connect(authMapStateToProps, { }),
	withAuth,
	connect(mapStateToProps, {
	follow, updateUsers, changePage,
	getTotalCountPage, fetching, following,
	setUsersTC, followTC, changePageTC
	})
	) (UsersAPI) ;