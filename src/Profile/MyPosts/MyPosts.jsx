import React from 'react'
import classes from "./MyPosts.module.css"

const Post = (props) => {
	return(
		<div>
			<img className={classes.postIcon} src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.omiV3-v4WOPffGJWRdtK3wHaGP%26pid%3DApi&f=1"/>
			<div>
				{props.PostText}
			</div>
		</div>
	);
}



const MyPosts = (props) => {

let Posts = props.PostsData.map(p => <Post PostText={p.message}/>)

	return (
		<div className={classes.posts}>
			{Posts}
		</div>
	);
}

export default MyPosts;