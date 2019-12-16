import React from 'react';
import css from './PaginatorsButton.module.css';
import cn from 'classnames';

export const PaginatorButton = ({pageNumber, currentPage, callback}) => {
    return (
        <button onClick={() => callback(pageNumber)}
                className={cn(css.buttons, {[css.buttonUserFollowed]: currentPage === pageNumber})}>
            {pageNumber}
        </button>
    )
};