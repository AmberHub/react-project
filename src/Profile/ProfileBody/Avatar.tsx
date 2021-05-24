import React, { ChangeEvent } from "react"
import defaultPhoto from  "./../../img/defaultPhoto.jpg"
import imgHelper from "./../../img/imgHelper.png"
import classes from "./ProfileBody.module.css"
import { PhotosType } from "../../utils/types"

type PropsType = {
	isOwner : boolean
	photos: PhotosType | null

	selectPhoto : (e: ChangeEvent<HTMLInputElement>) => void
}

const Avatar: React.FC<PropsType> = ({isOwner, selectPhoto, photos}) => {
	if(photos === null)
		photos = {large: null, small: null}
	return 	<div className={classes.avaPhotoWrapper}>
		{isOwner &&
			<input type="file" name="file" id="file" onChange={selectPhoto}/>
		}
  			<label htmlFor="file"><img className={isOwner ? classes.avaPhoto : classes.avaPhotoOtherUser} src={photos.large ?
  			photos.large : defaultPhoto} alt="photo"/><img src={imgHelper} className={classes.imgHelper} alt="photo"/></label>
		</div>
}

export default Avatar