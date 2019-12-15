import React from "react";
import css from "./NothingIsThere.module.css";

export const NothingIsThere = ({activateEditForm}) => {
    return (
        <div className={css.container}>
            <div className={css.NothingIsThere}>
                <div className={css.smileWithText}>
                    <span className={css.smile}/>
                    <span className={css.nothingText}>Nothing is there</span>
                </div>
                <button className={css.button} onClick={() => activateEditForm(true)}>Create your jog first</button>
            </div>
        </div>
    )
};