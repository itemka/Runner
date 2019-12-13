import React from "react";
import css from "./Header.module.css";
import logo from "./../../Files/Images/Logo/logo.png";
import filterImg from "./../../Files/Images/Filter/filterPNG/filter.png";
import filterActiveImg from "./../../Files/Images/Filter/filter-activePNG/filter-active.png";

export const Header = ({section, activateSection, pages, filter, activateFilter, isAuth}) => {
    let JOGS = section === pages.jogs ? `${css.JOGS} ${css.afterNav}` : `${css.JOGS}`;
    let INFO = section === pages.info ? `${css.INFO} ${css.afterNav}` : `${css.INFO}`;
    let CONTACT_US = section === pages.contactUs ? `${css.CONTACTUS} ${css.afterNav}` : `${css.INFO}`;
    return (
        <div className={css.header}>
            <img src={logo} alt={`logo`} className={css.logo}/>
            {isAuth && <span className={css.nav}>
                <a href={`#jogs`} className={`${JOGS} ${css.menuHeaderFont}`}
                   onClick={() => activateSection(pages.jogs)}>JOGS</a>
                <a href={`#info`} className={`${INFO} ${css.menuHeaderFont}`}
                   onClick={() => activateSection(pages.info)}>INFO</a>
                <span><a href={`#contactus`} className={`${CONTACT_US} ${css.menuHeaderFont}`}
                         onClick={() => activateSection(pages.contactUs)}>CONTACT US</a></span>
                {!filter
                    ? <a href={`#jogs`}><img onClick={() => activateFilter(true)}
                                             className={css.filter}
                                             src={filterImg}
                                             alt={`filter`}/></a>
                    : <a href={`#jogs`}><img className={css.filter_active}
                                             onClick={() => activateFilter(false)}
                                             src={filterActiveImg}
                                             alt={`filterActive`}/></a>}
            </span>}
        </div>
    )
};