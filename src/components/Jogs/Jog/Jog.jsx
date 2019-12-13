import React from "react";
import css from "./Jog.module.css";
import jogImg from "./../../../Files/Images/jog.svg";

export const Jog = () => {
    return (
        <div className={css.jog}>
            <img src={jogImg} className={css.jogImg} alt="jog"/>
            <div className={css.jogData}>
                <span className={css.dataItem}><span className={css.dataItemColor}>20.12.2017</span></span>
                <span className={`${css.dataItem} ${css.thick}`}>
                    Speed: <span className={css.dataItemColor}>15</span>
                </span>
                <span className={`${css.dataItem} ${css.thick}`}>
                    Distance: <span className={css.dataItemColor}>10 km</span>
                </span>
                <span className={`${css.dataItem} ${css.thick}`}>
                    Time: <span className={css.dataItemColor}>60 min</span>
                </span>
            </div>
        </div>
    )
};