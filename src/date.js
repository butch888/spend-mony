let day = new Date().getDate();
let month = new Date().getMonth();
let year = new Date().getFullYear();

if(month === 9) {
    month = 10;
}
if(month > 0 &&  month < 10) {
    month = '0' + (month);
} 

export const date = `${day}.${month + 1}.${year}`;

