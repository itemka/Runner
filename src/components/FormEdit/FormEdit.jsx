import React from 'react';
import css from './FormEdit.module.css';
import cancel from './../../Files/Images/cancel.svg';

export class FormEdit extends React.Component {
    state = {
        title: '',
        text: '',
    };

    render() {
        return (
            <div className={css.FormEdit}>
                <img src={cancel} alt="cancel" className={css.cancel}/>

                <div><span className={css.inputTitle}>Distance</span><input className={css.input} type="text"/></div>
                <div><span className={css.inputTitle}>Time</span><input className={css.input} type="text"/></div>
                <div><span className={css.inputTitle}>Date</span><input className={css.input} type="text"/></div>
                <div>
                    <button className={`${css.button}`}><span className={css.Save}>Save</span></button>
                </div>
            </div>
        )
    }
}