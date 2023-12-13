export const messages = {
    selectCategory: {
        ru: 'Выберите Категорию!',
        en: 'Select category!'
    },
    enterTitle: {
        ru: 'Введите название покупки!',
        en: 'Enter title!'
    },
    enterCost: {
        ru: 'Введите стоимость покупки!',
        en: 'Enter cost!'
    },
    addPurchases: {
        ru: 'Запись успешно добавлена.',
        en: 'The note was added successfully.'
    },
    inpPlaceholdetTitle: {
        ru: 'название',
        en: 'title'
    },
    inpPlaceholdetCost: {
        ru: 'цена',
        en: 'cost'
    },
    category: {
        ru: 'Категории',
        en: 'Categories'
    },
    btnAddPurchase: {
        ru: 'Добавить запись',
        en: 'Add note'
    }
};

export const getTranslate = (lang , message) => {
    if (lang) {
        return message.en;
    } else {
        return message.ru;
    }
}