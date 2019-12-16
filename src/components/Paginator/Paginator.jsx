import React, {useState} from "react";
import {getCurrentPage, getCurrentPortionForPaginator, getPagesCounterArray} from "../../Redux/Selectors";
import {connect} from "react-redux";
import css from "./Paginator.module.css";
import {PaginatorButton} from "./PaginatorsButton/PaginatorsButton";
import {SetCurrentPageThunk, SetPortionNumberForPaginator} from "../../Redux/Reducer";

const Paginator = ({portionSize = 10, currentPage, SetCurrentPageThunk, pagesCounterArray, currentPortionForPaginator, SetPortionNumberForPaginator}) => {

    // calculate count of pages portions
    let portionCount = Math.ceil(pagesCounterArray.length / portionSize);
    let [portionNumber, setPortionNumber] = useState(currentPortionForPaginator);
    let SetPortionForPaginator = currentPortion => {
        setPortionNumber(currentPortion);
        SetPortionNumberForPaginator(currentPortion)
    };

    // calculate left/right border
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={css.center}>
            {portionNumber > 1 &&
            <button className={css.nextPage} onClick={() => SetPortionForPaginator(portionNumber - 1)}>BACK</button>}
            {pagesCounterArray
                .filter((pageN) => pageN >= leftPortionPageNumber && pageN <= rightPortionPageNumber)
                .map(pageNumber => {
                        return <PaginatorButton key={pageNumber} pageNumber={pageNumber}
                                                currentPage={currentPage}
                                                callback={SetCurrentPageThunk}
                        />
                    }
                )}
            {portionCount > portionNumber &&
            <button className={css.nextPage} onClick={() => SetPortionForPaginator(portionNumber + 1)}>NEXT</button>}
        </div>
    )

};

let mapStateToProps = state => ({
    currentPage: getCurrentPage(state),
    pagesCounterArray: getPagesCounterArray(state),
    currentPortionForPaginator: getCurrentPortionForPaginator(state)
});
export default connect(mapStateToProps, {SetCurrentPageThunk, SetPortionNumberForPaginator})(Paginator)
