import React from 'react';
import { nanoid } from 'nanoid';
import { Select } from '../../AppStyle';

function Selects({ selectedCategory, setSelectedCategory, categories, lang}) {

    function handleSelectedCategory(e) {
        setSelectedCategory(e.target.value);
    }
    
    return (
        <div>
            <Select value={selectedCategory} title='Выбрать категорию' onChange={handleSelectedCategory}>
                <option value='Категории'>{!lang ? 'Категории' : 'Categories'}</option>
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