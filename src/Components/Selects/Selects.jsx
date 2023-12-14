import React from 'react';
import { nanoid } from 'nanoid';
import { Select } from '../../AppStyle';
import { getTranslate, messages } from '../../messages';

function Selects({ selectedCategory, setSelectedCategory, categories, lang, index, setIndex}) {

    function handleSelectedCategory(e) {
        setSelectedCategory(e.target.value);

        if (index === "btnSearch") {
            setIndex('');
        }
    }
    
    return (
        <div>
            <Select value={selectedCategory} onChange={handleSelectedCategory}>
                <option value={getTranslate(lang, messages.appNavCategory)}>{getTranslate(lang, messages.category)}</option>
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