import React, {useState} from "react";
import css from "./Filter.module.css";

export const Filter = ({FilterDataOfJogs}) => {
    let [leftBorder, setLeftBorder] = useState('');
    let [rightBorder, setRightBorder] = useState('');

    let checkLeftBorder = event => {
        setLeftBorder(event.currentTarget.value);
        event.currentTarget.value.length === 10 && FilterDataOfJogs(event.currentTarget.value, rightBorder);
        event.currentTarget.value.length === 0 && FilterDataOfJogs(event.currentTarget.value, rightBorder);
    };
    let checkRightBorder = event => {
        setRightBorder(event.currentTarget.value);
        event.currentTarget.value.length === 10 && FilterDataOfJogs(leftBorder, event.currentTarget.value);
        event.currentTarget.value.length === 0 && FilterDataOfJogs(leftBorder, event.currentTarget.value);
    };

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