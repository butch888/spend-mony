import React from 'react';
import { nanoid } from 'nanoid';
import { Select } from '../../AppStyle';

function Selects({ selectedCategory, setSelectedCategory, categories, lang, index, setIndex}) {

    function handleSelectedCategory(e) {
        setSelectedCategory(e.target.value);

        if (index === "btnSearch") {
            setIndex('');
        }
    }
    
    return (
        <div>
            <Select value={selectedCategory} title='Выбрать категорию' onChange={handleSelectedCategory}>
                <option value={!lang ? 'Категории' : 'Categories'}>{!lang ? 'Категории' : 'Categories'}</option>
                {categories.map((category) => (
                    <option key={nanoid(7)} value={category}>
                        {category}
                    </option>
                ))}
            </Select>
        </div>
    )
}

export default Selects;