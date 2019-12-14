import React from "react";
import css from "./SessionWindow.module.css";

export const SessionWindow = ({authorizationCheck}) => {
    return (
        <div className={css.SessionWindow}>
            <span className={css.bearFace}/>
            <button className={css.button} onClick={() => authorizationCheck()}>
                <span className={css.buttonText}>Let me in</span>
            </button>
        </div>
    )
};