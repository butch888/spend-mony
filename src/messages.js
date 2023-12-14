export const messages = {
    // start App
    appTitle: {
        ru: 'Журнал расходов',
        en: 'Expense journal'
    },
    appNavSpend: {
        ru: 'Записи',
        en: 'Spending'
    },
    appNavStatistic: {
        ru: 'Статистика',
        en: 'Statistics'
    },
    appNavCategory: {
        ru: 'Категории',
        en: 'Categories'
    },
    period: {
        ru: 'Все ',
        en: 'All '
    },
    today: {
        ru: ' за сегодня:',
        en: ' for today:'
    },
    month: {
        ru: ' за этот месяц:',
        en: ' for current month:'
    },
    year: {
        ru: ' за этот год:',
        en: ' for current year:'
    },
    allTime: {
        ru: ' за все время:',
        en: ' for all time:'
    },
    nowCategory: {
        ru: 'Категория ',
        en: 'Category '
    },
    // end App

    // start Category
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
        en: 'Add note',
    },
    // end Category
    // start Statistic
    btnToday: {
        ru: 'Сегодня',
        en: 'Today'
    },
    btnMonth: {
        ru: 'Этот месяц',
        en: 'Current month'
    },
    btnYear: {
        ru: 'Этот год',
        en: 'Current year'
    },
    btnAllTime: {
        ru: 'За все время',
        en: 'All time'
    },
    btnSearch: {
        ru: 'Найти',
        en: 'Search'
    },
    // end Statistic
};

export const getTranslate = (lang , message) => {
    return message[lang]
}