import React from 'react';
import { nanoid } from 'nanoid';
import { Select } from '../../AppStyle';
import { arrCategories } from '../../data';

function Selects({ selectedCategory, setSelectedCategory,}) {

    function handleSelectedCategory(e) {
        setSelectedCategory(e.target.value);
    }
    
    return (
        <div>
            <Select value={selectedCategory} title='Выбрать категорию' onChange={handleSelectedCategory}>
                <option value='Категории'>Категории</option>
                {arrCategories.map((category) => (
                    <option key={nanoid(7)} value={category}>
                        {category}
                    </option>
                ))}
            </Select>

        </div>
    )
}

export default Selects;