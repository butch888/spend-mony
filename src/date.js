let d = new Date();

export let day = (d.getDate()).toString().padStart(2, '0'); //padStart(2, '0') первый параметр - количество символов, которое в будет в итоге, второй параметр - то, что нужно добавить, если символ один.
export let month = (+d.getMonth() + 1).toString().padStart(2, '0');
export let year = d.getFullYear();

export const date = `${day}.${month}.${year}`;




