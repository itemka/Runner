import React from "react";
import css from "./MobileMenu.module.css";
import close from "../../../Files/Images/close.svg";
import {NavLink} from "react-router-dom";

export const MobileMenu = ({activateMobileMenu}) => {
    return (
        <div className={css.mobileMenu}>
            <span className={css.logo}/>
            <NavLink to onClick={() => activateMobileMenu(false)}><img src={close} alt="cancel" className={css.cancel}/></NavLink>
            <span className={css.mobileNav}>
                    <NavLink to={`/jogs`}
                             className={`${css.menuHeaderFont}`}
                             onClick={() => activateMobileMenu(false)}>JOGS</NavLink>
                    <NavLink to={`/info`}
                             className={`${css.menuHeaderFont}`}
                             onClick={() => activateMobileMenu(false)}>INFO</NavLink>
                    <NavLink to={`/contactus`}
                             className={`${css.menuHeaderFont}`}
                             onClick={() => activateMobileMenu(false)}>CONTACT US</NavLink>
            </span>
        </div>
    )
};