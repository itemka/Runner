export const formatDate = el => {
    let date = new Date(el * 1000);
    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    let yyyy = date.getFullYear();
    if (yyyy < 10) yyyy = '0' + yyyy;

    return `${dd}.${mm}.${yyyy}`;
};

export const changeDateToLongFormat = date => {
    return new Date(date.split(`.`).reverse().join('-'))
};

export const plusDaysToDate = (date, countOfDays) => {
    let later = date;
    return later.setDate(date.getDate() + countOfDays);
};
