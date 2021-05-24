import React, { ChangeEvent } from "react"
import classes from "./ProfileBody.module.css"
import Status from "./Status"
import ProfileInfoContainer from "./ProfileInfoContainer"
import Avatar from "./Avatar"
import { NavLink } from "react-router-dom"
import { PhotosType, ProfileDataType } from "../../utils/types"
import MyPostsContainer from "../MyPosts/MyPostsContainer";


type PropsType = {
	photos: PhotosType | null
	isOwner : boolean
	status : string | null
	profileData : ProfileDataType | null
	userId : number | null

	updateStatusTC : (status: string | null) => void
	selectPhoto : (e: ChangeEvent<HTMLInputElement>) => void
}


const ProfileBody: React.FC<PropsType> = ({selectPhoto, photos, isOwner,
											  status, updateStatusTC, profileData,
											  userId}) => {
		return <div className={classes.upProfile}>
			<div className={classes.ava}>
				<Avatar selectPhoto={selectPhoto} photos={photos} isOwner={isOwner}/>
			</div>

			<div className={classes.globalInfo}>
				{
					profileData ?
					<div className={classes.name}>{profileData.fullName}</div>
					: <div>unknown</div>

				}

				<div className={classes.status}>
					<Status isOwner={isOwner} statusFromProps={status} updateStatusTC={updateStatusTC}/>
					<span className={classes.startChat}>
					{
						!isOwner &&
						<NavLink to={`/dialogs/${userId}/messages`}><button>Chat</button></NavLink>
					}
				</span>
				</div>
			</div>
			<div className={classes.info}>
				<ProfileInfoContainer />
			</div>
			<div className={classes.MyPosts}>
				<MyPostsContainer />
			</div>

  		</div>
}

export default ProfileBody;