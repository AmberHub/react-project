import {connect} from "react-redux"
import React from 'react'
import MyPosts from "./MyPosts.jsx"
import classes from "./Post.module.css"

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


let mapStateToProps = (state) => {
	return {
		Posts : state.Profile.PostsData.map(p => <Post PostText={p.message} key={p.id}/>)
	}
}

let mapDispatchToProps = (dispatch) => {
	return {
		
	}
}

const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

export default MyPostsContainer;