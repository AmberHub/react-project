import React from "react"
import classes from "./Users.module.css"
import {NavLink} from "react-router-dom"
import Paginator from "../utils/Paginator"
import defaultPhoto from  "./../img/defaultPhoto.jpg"
import { UsersType } from "../utils/types"


type PropsType = StateType & DispatchType

type StateType = {
	totalCountPage: number
	count: number
	currentPage: number
	currentPortion: number
	users: Array<UsersType>
	followInProgress: Array<number>
}

type DispatchType = {
	changePage : (page: number) => void
	changePortion : () => void
	followTC : (followed : boolean, id : number) => void
}

const Users: React.FC<PropsType> = ({totalCountPage, count, currentPage, changePage,
										changePortion, currentPortion, users,
										followInProgress, followTC, ...props}) => {
	return <div>
		<Paginator totalCountPage={totalCountPage} count={count} currentPage={currentPage} changePage={changePage} portionSizeFromProps={5} changePortion={changePortion} currentPortionFromProps={currentPortion}/>
		{
			users.map( u => <div key={u.id} className={classes.userItem}><NavLink className={classes.nav} to={`/profile/${u.id}`}>
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
				u.followed ? followTC(false, u.id) : followTC(true, u.id) }>{u.followed ? "followed" : "unfollowed"}</button>
		</div>)
		}
	</div>
}


export default Users;