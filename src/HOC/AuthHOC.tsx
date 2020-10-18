import React from "react";
import { Redirect } from "react-router-dom";

type containerComponentWithAuthPropsType = {
	isAuth : boolean
}

export const withAuth = (Component: React.ComponentType<any | string>) => {

	let containerComponentWithAuth: React.FC<containerComponentWithAuthPropsType> = ({isAuth, ...props}) => {

			if (!isAuth)
			return <Redirect to={"/login"} />
			
			return <Component {...props} />
	}

	return containerComponentWithAuth;
}




