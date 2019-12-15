import React from "react";
import css from "./Filter.module.css";

export const Filter = ({leftBorder, checkLeftBorder, rightBorder, checkRightBorder}) => {
    return (
        <div className={css.Filter}>
            <span>
                <span className={css.filerText}>Date from</span>
                <input placeholder={`14.12.2019`}
                       onChange={checkLeftBorder}
                       value={leftBorder}
                       className={css.input}
                       type="text"/>
            </span>
            <span>
                <span className={css.filerText}>Date to</span>
                <input placeholder={`17.12.2019`}
                       onChange={checkRightBorder}
                       value={rightBorder}
                       className={css.input}
                       type="text"/>
            </span>
        </div>
    )
};