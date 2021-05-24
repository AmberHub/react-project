import React, {ChangeEvent} from "react"
import classes from "./Users.module.css"
import {NavLink} from "react-router-dom"
import defaultPhoto from  "./../img/defaultPhoto.jpg"
import { UsersType } from "../utils/types"
import { Pagination } from 'antd'
import { Input } from 'antd';
import 'antd/dist/antd.css'

type PropsType = StateType & DispatchType

type StateType = {
	totalCountPage: number
	count: number
	currentPage: number
	currentPortion: number
	users: Array<UsersType>
	followInProgress: Array<number>
	valueOfSearch : string
	page: number
}

type DispatchType = {
	changePage : (page: number) => void
	changePortion : () => void
	follow : (followed : boolean, id : number) => void
	searchUsers : (element : ChangeEvent<HTMLInputElement>) => void
}

const Users: React.FC<PropsType> = ({totalCountPage, count, currentPage, changePage, users,
										followInProgress, follow, searchUsers, valueOfSearch,page}) => {
	return <div>
		<div className={classes.navigateBlock}>
			<div className={classes.searchInputUsers}>
				<Input placeholder="Search users" allowClear size="middle" onChange={searchUsers} value={valueOfSearch} />
			</div>
			<div  className={classes.paginator}>
				<Pagination current={currentPage} showSizeChanger={false}
							defaultPageSize={count} onChange={changePage} total={totalCountPage} />
			</div>
		</div>
		{
			users.map( u => <div key={u.id} className={classes.userItem}><NavLink className={classes.userItem} to={`/profile/${u.id}`}>
			<img className={classes.avatar} src={u.photos.small ? u.photos.small : defaultPhoto} alt="photo"/>
			<br/>
			<span className={classes.name}>{u.name}</span>
			<br/>
			<span className={classes.status}>{u.status}</span>
			<br/>
			<span>u.location.country <br/> u.location.city</span>
			<br/>

			</NavLink>
			<button disabled={followInProgress.some(id => id === u.id)} className={classes.buttonFollow} onClick={ () =>
				u.followed ? follow(false, u.id) : follow(true, u.id) }>{u.followed ? "followed" : "unfollowed"}</button>
		</div>)
		}
	</div>
}


export default Users;