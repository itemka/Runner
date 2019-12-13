import React from 'react';
import css from './EditForm.module.css';
import cancel from '../../../Files/Images/cancel.svg';

export function EditForm({activateAdd}) {
    return (
        <div className={css.EditForm}>
            <div><a href="#jogs" onClick={() => activateAdd(false)}><img src={cancel} alt="cancel"
                                                                         className={css.cancel}/></a></div>
            <div className={css.saveForm}>
                <div className={css.inputs}>
                    <div className={css.inputElements}><span className={css.inputTitle}>Distance</span><input
                        className={css.input} type="text"/>
                    </div>
                    <div className={css.inputElements}><span className={css.inputTitle}>Time</span><input
                        className={css.input} type="text"/>
                    </div>
                    <div className={css.inputElements}><span className={css.inputTitle}>Date</span><input
                        className={css.input} type="text"/>
                    </div>
                </div>
                <div>
                    <button className={`${css.button}`}><span className={css.Save}>Save</span></button>
                </div>
            </div>
        </div>
    )
}