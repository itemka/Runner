import React from "react";
import css from "./NothingIsThere.module.css";
import sad from "../../Files/Images/SedSmile/sad.svg"

export const NothingIsThere = () => {
    return (
        <div className={css.NothingIsThere}>
            <img src={sad} alt="sad"/>
            <span className={css.nothingText}>Nothing is there</span>
            <button className={css.button}>Create your jog first</button>
        </div>
    )
};