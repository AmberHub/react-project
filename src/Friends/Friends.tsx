import React from 'react'
import classes from "./Friends.module.css"
import {UsersType} from "../utils/types";
import {NavLink, Redirect} from "react-router-dom";
import defaultPhoto from "../img/defaultPhoto.jpg"
import Paginator from "../utils/Paginator";
import { Pagination } from 'antd';
import 'antd/dist/antd.css';

type PropsType = {
	friends : Array<UsersType> | null
	followInProgress : Array<number>
	totalCountPage : number
	currentPortion : number
	count : number
	currentPage : number
	page: number

	changePageFriends : (page : number) => void
	changePortionFriends : (portion : number) => void
	followTC: (op: boolean, id: number, isFriendsPage?: boolean) => void
}

const Friends: React.FC<PropsType> = ({friends,followInProgress,followTC,
										  totalCountPage, currentPortion, count,
										  currentPage, changePageFriends, changePortionFriends}) => {
	return ( <div>
			<Pagination current={currentPage} defaultPageSize={count} onChange={changePageFriends} total={totalCountPage} />
		<div className={classes.gridWrapper}>
			{
				friends ? friends.map( f => <div><NavLink className={classes.item} to={`profile/${f.id}`}>
					<img className={classes.ava} src={f.photos.large !== null ? f.photos.large : defaultPhoto} alt="ava"/>
						<div>
							<div>{f.name}</div>
							{f.status && <div>{f.status}</div>}
						</div>
					</NavLink>
					<button disabled={followInProgress.some(id => id === f.id)} onClick={ () =>
						f.followed ? followTC(false, f.id, true) : followTC(true, f.id, true) }>{f.followed ? "followed" : "unfollowed"}</button>
				</div>)
				: <div><Redirect to={"/users"} /></div>
			}
		</div>
	</div>
	);
}


export default Friends;