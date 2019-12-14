import React from "react";
import css from "./Header.module.css";
import filterImg from "./../../Files/Images/Filter/filterPNG/filter.png";
import filterActiveImg from "./../../Files/Images/Filter/filter-activePNG/filter-active.png";
import {NavLink} from "react-router-dom";
import cn from 'classnames';

export const Header = ({filter, activateFilter, isAuth, activateMobileMenu, location}) => {
    let newPath = location.pathname.replace(`/`, ``);
    let JOGS = newPath === `jogs` ? `${css.afterNav}` : ``;
    let INFO = newPath === `info` ? `${css.afterNav}` : ``;
    let CONTACT_US = newPath === `contactus` ? `${css.afterNav}` : ``;
    return (
        <div className={css.header}>
            <span className={css.logo}/>
            {isAuth && <span className={css.nav}>
                <span className={css.desktopMenu}>
                    <NavLink to={`jogs`} className={`${JOGS} ${css.menuHeaderFont}`}>JOGS</NavLink>
                    <NavLink to={`info`} className={`${INFO} ${css.menuHeaderFont}`}>INFO</NavLink>
                    <NavLink to={`contactus`} className={`${CONTACT_US} ${css.menuHeaderFont}`}>CONTACT US</NavLink>
                </span>
                <span className={cn(css.showFilter, {[css.showFilterMobile]: newPath === `jogs`})}>
                    {!filter
                        ? <NavLink to={`jogs`}><img onClick={() => activateFilter(true)}
                                                    className={css.filter}
                                                    src={filterImg}
                                                    alt={`filter`}/></NavLink>
                        : <NavLink to={`jogs`}><img className={css.filter_active}
                                                    onClick={() => activateFilter(false)}
                                                    src={filterActiveImg}
                                                    alt={`filterActive`}/></NavLink>}
                </span>
                <span className={css.burger} onClick={() => activateMobileMenu(true)}/>
            </span>}
        </div>
    )
};