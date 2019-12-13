import React, {useState} from "react";
import css from "./Runner.module.css";
import {SessionWindow} from "../SessionWindow/SessionWindow";
import {Info} from "../Info/Info";
import {Jogs} from "../Jogs/Jogs";
import {Header} from "../Header/Header";

export const Runner = () => {
    let pages = {jogs: `jogs`, info: `info`, contactUs: `contactUs`};
    let [section, setSection] = useState(pages.jogs);
    let [filter, setFilter] = useState(false);
    let [add, setAdd] = useState(false);
    let activateSection = sectionName => setSection(sectionName);
    let activateFilter = bool => setFilter(bool);
    let activateAdd = bool => setAdd(bool);

    let isAuth = false;
    return (
        <div className={css.Runner}>
            <Header section={section} activateSection={activateSection} pages={pages}
                    filter={filter} activateFilter={activateFilter} isAuth={isAuth}/>
            {!isAuth
                ? <div className={css.underHeader}><SessionWindow/></div>
                : <>
                    {section === pages.jogs ? <Jogs filter={filter} add={add} activateAdd={activateAdd}/> : null}
                    {section === pages.info && <div className={css.underHeader}><Info/></div>}
                </>
            }
        </div>
    )
};