import React, {useState} from 'react';
import css from './EditForm.module.css';
import cancel from '../../../Files/Images/cancel.svg';

export const EditForm = ({activateAdd, addJogThunk}) => {
    let [distance, setDistance] = useState('');
    let [time, setTime] = useState('');
    let [date, setDate] = useState('');
    let getDistance = event => setDistance(event.currentTarget.value);
    let getTime = event => setTime(event.currentTarget.value);
    let getDate = event => setDate(event.currentTarget.value);
    let addJog = () => {
        addJogThunk(+distance, +time, date);
        activateAdd(false);
    };

    return (
        <div className={css.EditForm}>
            <div><a href="#jogs" onClick={() => activateAdd(false)}><img src={cancel} alt="cancel"
                                                                         className={css.cancel}/></a></div>
            <div className={css.saveForm}>
                <div className={css.inputs}>
                    <div className={css.inputElements}>
                        <span className={css.inputTitle}>Distance</span>
                        <input placeholder={`Пример: 10`} onChange={getDistance} value={distance} className={css.input} type="text"/>
                    </div>
                    <div className={css.inputElements}>
                        <span className={css.inputTitle}>Time</span>
                        <input placeholder={`Пример: 10`} onChange={getTime} value={time} className={css.input} type="text"/>
                    </div>
                    <div className={css.inputElements}>
                        <span className={css.inputTitle}>Date</span>
                        <input placeholder={`Пример: 15.12.2019`} onChange={getDate} value={date} className={css.input} type="text"/>
                    </div>
                </div>
                <div>
                    <button className={`${css.button}`} onClick={() => addJog()}>
                        <span className={css.Save}>Save</span>
                    </button>
                </div>
            </div>
        </div>
    )
}