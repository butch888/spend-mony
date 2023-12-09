

let category = localStorage.getItem('category');

    if (category === null) {
        localStorage.setItem('category', JSON.stringify(['Продукты', 'Топливо', 'Развлечения', 'Ремонт']));
    }
    
    let strCategories = localStorage.getItem('category');

    export const arrCategories = JSON.parse(strCategories)
