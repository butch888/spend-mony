// const shoppings = [
//   {id: 1, date: "22.11.2023", cost: "3000", designation: "АИ-95", kind: "Топливо"},
//   {id: 2, date: "22.11.2023", cost: "1500", designation: "Торт", kind: "Продукты"},
//   {id: 3, date: "03.11.2023", cost: "2500", designation: "АИ-100", kind: "Топливо"},
//   {id: 4, date: "10.09.2021", cost: "6000", designation: "Durex", kind: "Развлечения"},
//   {id: 5, date: "10.09.2023", cost: "16000", designation: "SPA", kind: "Развлечения"},
//   {id: 6, date: "22.10.2021", cost: "2500", designation: "АИ-100", kind: "Топливо"},
//   {id: 7, date: "03.09.2021", cost: "2500", designation: "АИ-100", kind: "Топливо"},
// ];

let category = localStorage.getItem('category');
    if (category === null) {
        localStorage.setItem('category', JSON.stringify(['Продукты', 'Топливо', 'Развлечения', 'Ремонт']));
    }
    let strCategories = localStorage.getItem('category');
    export const arrCategories = JSON.parse(strCategories)

  // export default shoppings;