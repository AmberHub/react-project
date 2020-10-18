import React, {useState} from "react";
import classes from "./Paginator.module.css"

type PropsType = StateType & DispatchType

type StateType = {
	totalCountPage : number
	count : number
	portionSizeFromProps : number
	currentPortionFromProps : number
	currentPage : number
}

type DispatchType = {
	changePage : (page : number) => void
	changePortion : (currentProtion : number) => void
}

const Paginator: React.FC<PropsType> = ({totalCountPage, count, portionSizeFromProps, currentPortionFromProps, currentPage, changePage, changePortion, ...props}) => {

let pageCount = Math.ceil(totalCountPage / count);
let pages = [];
for( let i = 1; i <= pageCount; i++) {
	pages.push(i);

}
let [portionSize] = useState(portionSizeFromProps);
let [currentPortion, setCurrentPortion] = useState(currentPortionFromProps);
let allPortions = Math.ceil(totalCountPage / portionSize);
let minPage = (currentPortion - 1) * portionSize + 1 ;
let maxPage = minPage + portionSize;

return <div>
	{currentPortion > 1 &&
		<button onClick={ () => setCurrentPortion(currentPortion - 1) }>Prev</button>
	}

{
	pages.map( p => minPage <= p && maxPage > p && <span key={p}
	className={`${classes.num} ${p===currentPage ? classes.currentPageNumber : ""}`}
	onClick = { () => {
		changePage(p)
		changePortion(currentPortion) } }>{p}</span> )
}

	{currentPortion + 1 <= allPortions &&
		<button onClick={ () => setCurrentPortion(currentPortion + 1) } >Next</button>
	}

</div>
}


export default Paginator;

