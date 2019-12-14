import React from "react";
import css from "./Filter.module.css";

export const Filter = () => {
    return (
        <div className={css.Filter}>
            <span>
                <span className={css.filerText}>Date from</span>
                <input className={css.input} type="text"/>
            </span>
            <span>
                <span className={css.filerText}>Date to</span>
                <input className={css.input} type="text"/>
            </span>
        </div>
    )
};