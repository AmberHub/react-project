import React from "react";
import {connect} from "react-redux";
import {follow, updateUsers, changePage, getTotalCountPage, fetching} from "./../Redux/actionCreators.js";
import Users from "./Users.jsx";
import * as axios from "axios";
import Preloader from "./../Preloader.jsx";


class UsersAPI extends React.Component {

	componentDidMount = () => {
		this.props.fetching();
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.page}&count=${this.props.count}`).then( response => {
			this.props.updateUsers(response.data.items);
			this.props.getTotalCountPage(response.data.totalCount);
			this.props.fetching();
		})
	}

	changePage = (p) => {
		this.props.fetching();
		this.props.changePage(p);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.count}`).then( response => {
			this.props.updateUsers(response.data.items)
			this.props.fetching();
		});
		

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
					totalCountPage={this.props.totalCountPage}/>} </>
	}
};

let mapStateToProps = (state) => {
	return{	
	users : state.UsersPage.users,
	page: state.UsersPage.page,
	count: state.UsersPage.count,
	totalCountPage : state.UsersPage.totalCountPage,
	currentPage : state.UsersPage.currentPage,
	isFetching: state.UsersPage.isFetching
	}
};

const UsersContainer = connect(mapStateToProps, {
	follow, updateUsers, changePage, getTotalCountPage, fetching
	}) (UsersAPI);

export default UsersContainer;