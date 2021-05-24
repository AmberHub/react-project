import React from "react";
import classes from "./Preloader.module.css";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Preloader = () => {
	const antIcon = <LoadingOutlined style={{ fontSize: 80}} spin />
	return <div className={classes.preloader}>
		<div className={classes.img}>
			<Spin indicator={antIcon} />
		</div>
	</div>
}

export default Preloader;