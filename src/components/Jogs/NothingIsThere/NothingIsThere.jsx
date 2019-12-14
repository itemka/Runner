import React from "react";
import css from "./NothingIsThere.module.css";

export const NothingIsThere = ({activateAdd}) => {
    return (
        <div className={css.NothingIsThere}>
            <div className={css.smileWithText}>
                <span className={css.smile}/>
                <span className={css.nothingText}>Nothing is there</span>
            </div>
            <button className={css.button} onClick={() => activateAdd(true)}>Create your jog first</button>
        </div>
    )
};