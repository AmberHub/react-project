import React from "react";
import classes from "./Users.module.css";
import * as axios from "axios";

class Users extends React.Component {

	componentDidMount = () => {
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.page}&count=${this.props.count}`).then( response => {
			this.props.updateUsers(response.data.items);
			this.props.getTotalCountPage(response.data.totalCount);
		})
	}

	changePage = (p) => {
		this.props.changePage(p);
		axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.count}`).then( response => {
			this.props.updateUsers(response.data.items)
		});
		

	}

	render = () => {
		let pageCount = Math.ceil(this.props.totalCountPage / this.props.count);

		let pages = [];

		for( let i = 1; i <= pageCount; i++) {
			pages.push(i);
		}
		
		return <div>
		{
			 pages.map( p => <span className={this.props.currentPage === p ? classes.currentPageNumber : classes.pageNumber} onClick = { () => this.changePage(p) }>{p}</span> )
		}

		{


			this.props.users.map( u => <div key={u.id} className={classes.userItem}>
			<img className={classes.avatar} src={u.photos.small ? u.photos.small : "https://exelord.com/ember-initials/images/default-d5f51047d8bd6327ec4a74361a7aae7f.jpg"} alt="photo"/>
			<br/>
			<span className={classes.name}>{u.name}</span> 
			<br/>
			<span className={classes.status}>{u.status}</span>
			<br/>
			<span>u.location.country <br/> u.location.city</span>
			<br/>
			<button className={classes.buttonFollow} onClick={ () =>  this.props.follow(u.id) }>{u.followed ? "followed" : "unfollowed"}</button>
		</div>)

		}
		<button onClick={ () => this.props.updateUsers() } className={classes.buttonMore}>More</button>
	</div>
	}
}

// const Users = (props) => {

// 	if(props.users.length === 0) {
// 		props.setUsers(
// 			[
// 				{ id: 1, follow: false, name: "Vasya", secondName: "Pypkin", status: "first BLL", location : {city : "Lvov", country: "Ukraine"}, photo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Pic-vk-allaboutme-ava-2.jpg"},
// 				{ id: 2, follow: true, name: "Tom", secondName: "Watcher", status: "first UI", location : {city : "New-York", country: "USA"}, photo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Pic-vk-allaboutme-ava-2.jpg"},
// 				{ id: 3, follow: false, name: "Vova", secondName: "Mechkov", status: "first API", location : {city : "Minsk", country: "Belarus"}, photo: "https://upload.wikimedia.org/wikipedia/commons/f/f5/Pic-vk-allaboutme-ava-2.jpg"}
// 			]
// 		)
// 	};
		

// 	return <div>
// 		{props.users.map( u => <div className={classes.userItem}>
// 			<img className={classes.avatar} src={u.photo} alt="photo"/>
// 			<br/>
// 			<span className={classes.name}>{u.name + " " + u.secondName}</span> 
// 			<br/>
// 			<span className={classes.status}>{u.status}</span>
// 			<br/>
// 			<span>{u.location.country} <br/> {u.location.city}</span>
// 			<br/>
// 			<button onClick={ () =>  props.follow(u.id) }>{u.follow ? "followed" : "unfollowed"}</button>
// 		</div>)}
// 	</div>
// }


export default Users;