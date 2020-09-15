import {connect} from "react-redux";
import React from 'react';
import MyPosts from "./MyPosts.jsx";
import classes from "./Post.module.css";
import { addPost } from "./../../Redux/actionCreators.js";
import { reset } from "redux-form";
import Post from "./Post.jsx";
import { getPostData } from "./../../Selectors/profileSelectors.js"


const MyPostsContainer = (props) => {
	let onSubmit = (values) => {
		props.addPost(values.post);
		props.reset("postForm");
	}

	return <MyPosts {...props} onSubmit={onSubmit} />
}


let mapStateToProps = (state) => ({
		Posts : getPostData(state).map(p => <Post photo={state.Profile.photos} PostText={p.message} key={p.id}/>)
})



export default connect(mapStateToProps, { addPost, reset })(MyPostsContainer);;