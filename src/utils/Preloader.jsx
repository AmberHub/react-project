import React from "react";
import classes from "./Preloader.module.css";
import preloader from "./../img/preloader.gif";

const Preloader = () => {
	return <div className={classes.preloader}>
		<img src={preloader} alt="preloader"/>
	</div>
}

export default Preloader;