import React from "react"
import classes from "./Post.module.css"
import defaultPhoto from "./../../img/defaultPhoto.jpg"

type PropsType = {
    photoSmall: string | null
    PostText: string
}

const Post: React.FC<PropsType> = ({photoSmall, PostText}) => {
    return <div>
        <img className={classes.postIcon} src={photoSmall ?
            photoSmall : defaultPhoto} alt={"photo"}/>
        <div>
            {PostText}
        </div>
    </div>
}

export default Post;