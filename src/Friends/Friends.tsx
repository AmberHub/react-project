import React, {ChangeEvent} from 'react'
import classes from "./Friends.module.css"
import {UsersType} from "../utils/types";
import {NavLink, Redirect} from "react-router-dom";
import defaultPhoto from "../img/defaultPhoto.jpg"
import { Pagination } from 'antd';
import { Input } from 'antd';
import 'antd/dist/antd.css';

type PropsType = {
	friends : Array<UsersType> | null
	followInProgress : Array<number>
	totalCountPage : number
	currentPortion : number
	count : number
	currentPage : number
	page: number
	valueOfSearchFriends: string

	changePageFriends : (page : number, valueOfSearchFriends?: number, hz?: string) => void
	changePortionFriends : (portion : number) => void
	follow: (op: boolean, id: number) => void
	searchUsers : (element : ChangeEvent<HTMLInputElement>) => void
}

const Friends: React.FC<PropsType> = ({friends,followInProgress,follow,
										  totalCountPage, count,
										  currentPage, changePageFriends, valueOfSearchFriends, searchUsers}) => {
	return ( <div>
			<div className={classes.searchInputUsers}>
				<Input placeholder="Search friends" allowClear size="middle" onChange={searchUsers} value={valueOfSearchFriends} />
			</div>
            <div className={classes.paginator}> <Pagination showSizeChanger={false} current={currentPage}
															defaultPageSize={count} onChange={changePageFriends}
															total={totalCountPage} /> </div>
		<div className={classes.gridWrapper}>
			{
				friends ?
						friends.map( f => <div><NavLink className={classes.item} to={`profile/${f.id}`}>
						<img className={classes.ava} src={f.photos.large !== null ? f.photos.large : defaultPhoto} alt="ava"/>
							<div>
								<div>{f.name}</div>
								{f.status && <div>{f.status}</div>}
							</div>
						</NavLink>
						<button disabled={followInProgress.some(id => id === f.id)} onClick={ () =>
							f.followed ? follow(false, f.id) : follow(true, f.id) }>{f.followed ? "followed" : "unfollowed"}</button>
					</div>)

					: <div><button onClick={() => <Redirect to={"/users"} />}>Users</button></div>
			}
		</div>
	</div>
	);
}


export default Friends;