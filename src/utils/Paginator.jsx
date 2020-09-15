import React, { useState, useEffect } from "react";
import classes from "./Paginator.module.css"
import classnames from "classnames";

const Paginator = (props) => {

let pageCount = Math.ceil(props.totalCountPage / props.count);
let pages = [];
for( let i = 1; i <= pageCount; i++) {
	pages.push(i);

}
let [portionSize] = useState(props.portionSize);
let [currentPortion, setCurrentPortion] = useState(props.currentPortion); 
let allPortions = Math.ceil(props.totalCountPage / portionSize);
let minPage = (currentPortion - 1) * portionSize + 1 ;
let maxPage = minPage + portionSize;

return <div>
	{currentPortion > 1 &&
		<button onClick={ () => setCurrentPortion(currentPortion - 1) }>Prev</button>
	}

{
	pages.map( p => minPage <= p && maxPage > p && <span key={p}
	className={`${classes.num} ${p===props.currentPage ? classes.currentPageNumber : ""}`}
	onClick = { () => {
		props.changePage(p)
		props.changePortion(currentPortion) } }>{p}</span> )
}

	{currentPortion + 1 <= allPortions &&
		<button onClick={ () => setCurrentPortion(currentPortion + 1) } >Next</button>
	}

</div>
}


export default Paginator;

