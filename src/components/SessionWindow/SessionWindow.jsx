import React from "react";
import css from "./SessionWindow.module.css";
import bearFace from "./../../Files/Images/bear-face.svg"

export const SessionWindow = () => {
    return (
        <div className={css.SessionWindow}>
            <img src={bearFace} alt="bearFace"/>
            <button className={css.button}><span className={css.buttonText}>Let me in</span></button>
        </div>
    )
};