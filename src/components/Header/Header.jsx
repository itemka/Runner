import React, {useState} from "react";
import css from "./Header.module.css";
import logo from "./../../Files/Images/Logo/logo.png";
// import logo2x from "./../../Files/Images/Logo/logo@2x.png";
// import logo3x from "./../../Files/Images/Logo/logo@3x.png";
import filterImg from "./../../Files/Images/Filter/filterPNG/filter.png";
import filterActiveImg from "./../../Files/Images/Filter/filter-activePNG/filter-active.png";

export const Header = () => {
    let [section, setSection] = useState('jogs');
    let activateSection = sectionName => setSection(sectionName);

    let JOGS = section === `jogs` ? `${css.JOGS} ${css.afterNav}` : `${css.JOGS}`;
    let INFO = section === `info` ? `${css.INFO} ${css.afterNav}` : `${css.INFO}`;
    let CONTACT_US = section === `contactUs` ? `${css.CONTACTUS} ${css.afterNav}` : `${css.INFO}`;
    let FILTER = section === `filter` ? true : false;
    return (
        <div className={css.header}>
            <img src={logo} alt={`logo`} className={css.logo}/>
            <span className={css.nav}>
                <span><a href={`#jogs`} onClick={() => activateSection('jogs')}
                         className={`${JOGS} ${css.menuHeaderFont}`}>JOGS</a></span>
                <span><a href={`#info`} onClick={() => activateSection('info')}
                         className={`${INFO} ${css.menuHeaderFont}`}>INFO</a></span>
                <span><a href={`#contactus`} onClick={() => activateSection('contactUs')}
                         className={`${CONTACT_US} ${css.menuHeaderFont}`}>CONTACT US</a></span>
                <span>{!FILTER
                    ? <a href={`#filter`}><img onClick={() => activateSection('filter')} className={css.filter}
                                               src={filterImg}
                                               alt={`filter`}/></a>
                    : <a href={`#filter`}><img className={css.filter_active} src={filterActiveImg}
                                               alt={`filterActive`}/></a>}</span>
            </span>
        </div>
    )
};