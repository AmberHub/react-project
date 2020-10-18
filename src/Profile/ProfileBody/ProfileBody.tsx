import React, { ChangeEvent } from "react"
import classes from "./ProfileBody.module.css"
import Status from "./Status"
import ProfileInfoContainer from "./ProfileInfoContainer"
import Avatar from "./Avatar"
import { NavLink } from "react-router-dom"
import { PhotosType, ProfileDataType } from "../../utils/types"


type PropsType = {
	photos : PhotosType
	isOwner : boolean
	status : string | null
	profileData : ProfileDataType | null
	userId : number | null

	updateStatusTC : (status: string | null) => void
	selectPhoto : (e: ChangeEvent<HTMLInputElement>) => void
}


const ProfileBody: React.FC<PropsType> = ({selectPhoto, photos, isOwner, status, updateStatusTC, profileData, userId}) => {
		return <div className={classes.upProfile}>
			<Avatar selectPhoto={selectPhoto} photos={photos} isOwner={isOwner}/>
			{profileData ?
				<div>{profileData.fullName}</div>
				: <div></div>
			}
			{!isOwner &&
			<div><NavLink to={`/dialogs/${userId}/messages`}><button>Chat</button></NavLink></div>
			}
			<ProfileInfoContainer />
  			<div>
  			<Status isOwner={isOwner} statusFromProps={status} updateStatusTC={updateStatusTC}/>
  			</div>
  		</div>
}

export default ProfileBody;