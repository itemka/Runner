import React from "react";
import css from "./NothingIsThere.module.css";
import sad from "../../../Files/Images/SedSmile/sad.svg"

export const NothingIsThere = ({activateAdd}) => {
    return (
        <div className={css.NothingIsThere}>
            <div className={css.smileWithText}>
                <div><img src={sad} alt="sad"/></div>
                <span className={css.nothingText}>Nothing is there</span>
            </div>
            <button className={css.button} onClick={() => activateAdd(true)}>Create your jog first</button>
        </div>
    )
};