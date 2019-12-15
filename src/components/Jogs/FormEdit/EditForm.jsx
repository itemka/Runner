import React from 'react';
import css from './EditForm.module.css';
import cancel from '../../../Files/Images/cancel.svg';

export const EditForm = ({distance, time, date, buttonName, getDistance, Cancel, getTime, getDate, buttonClick}) => {
    return (
        <div className={css.EditForm}>
            <div>
                <a href="#jogs" onClick={() => Cancel()}><img src={cancel} alt="cancel" className={css.cancel}/></a>
            </div>
            <div className={css.saveForm}>
                <div className={css.inputs}>
                    <div className={css.inputElements}>
                        <span className={css.inputTitle}>Distance</span>
                        <input placeholder={`Пример: 10`}
                               onChange={getDistance}
                               value={distance}
                               className={css.input}
                               type="text"/>
                    </div>
                    <div className={css.inputElements}>
                        <span className={css.inputTitle}>Time</span>
                        <input placeholder={`Пример: 10`}
                               onChange={getTime}
                               value={time}
                               className={css.input}
                               type="text"/>
                    </div>
                    <div className={css.inputElements}>
                        <span className={css.inputTitle}>Date</span>
                        <input placeholder={`Пример: 15.12.2019`}
                               onChange={getDate}
                               value={date}
                               className={css.input}
                               type="text"/>
                    </div>
                </div>
                <div>
                    <button className={`${css.button}`} onClick={() => buttonClick()}>
                        <span className={css.Save}>{buttonName}</span>
                    </button>
                </div>
            </div>
        </div>
    )
};