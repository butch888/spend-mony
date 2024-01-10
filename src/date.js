let day = new Date().getDate();
let month = new Date().getMonth();
let year = new Date().getFullYear();


if (day > 0 && day < 10) {
    day = '0' + day
}
if (month === 9) {
    month = 10;
}
// if (month > 0 &&  month < 10) {
//     month = '0' + (month);
// } 

// let dateToday = Date();

export const date = `${day}.${month + 1}.${year}`;

// export const date = dateToday.slice(4, 15).split(' ').join('-')
