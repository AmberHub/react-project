import React from "react";
import { Redirect } from "react-router-dom";

export const withAuth = (Component) => {

	let containerComponentWithAuth = (props) => {

			if (!props.isAuth)
			return <Redirect to={"/login"} />
			
			return <Component {...props} />
	}

	return containerComponentWithAuth;
}




