import React from "react"
import classes from "./Post.module.css"
import defaultPhoto from "./../../img/defaultPhoto.jpg"

type PropsType = {
    photo: string | null
    PostText: string
}

const Post: React.FC<PropsType> = ({photo, PostText}) => {
    return <div>
        <img className={classes.postIcon} src={photo ?
            photo : defaultPhoto} alt={"photo"}/>
        <div>
            {PostText}
        </div>
    </div>
}

export default Post;