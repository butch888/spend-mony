import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { date } from '../../date';
import { Input, Select, Button, Result } from '../../AppStyle';
import Alt from '../Popups/Alert/Alert';
import { arrCategories } from '../../data';

function Categories({ selectedCategory, setSelectedCategory, data, setData, purchases, onClose, setText, text, setActiveAlert, activAlert, time }) {

    const [inpValueName, setInpValueName] = useState('');
    const [inpValueCost, setInpValueCost] = useState('');

    const handleAddPurchase = () => {
        if (selectedCategory === 'Категории') {
            setActiveAlert(true);
            setText('Для добавления новой записи, выберите "Категорию!"');
        } else if(inpValueName === '') {
            setActiveAlert(true);
            setText('Для добавления новой записи, введите название покупки!');
        } else if(inpValueCost === '') {
            setActiveAlert(true);
            setText('Для добавления новой записи, введите стоимость покупки!');
        } else {
            let copy = [...data];
            copy.unshift({id: nanoid(5), date: date, designation: inpValueName, kind: selectedCategory, cost: inpValueCost})
            setData(copy);
            localStorage.setItem('spends', JSON.stringify(copy));
            setInpValueName('');
            setInpValueCost('');
            setSelectedCategory('Категории');
            onClose();
            setActiveAlert(true);
            setText('Запись успешно добавлена.')
        }
    };

    function handleSelectedCategory(e) {
        setSelectedCategory(e.target.value);
    }

    let sum = 0;
    function getSum() {
      purchases.map((e) => sum = sum + +e.cost)
      return sum;
    }
    
    return (
        <div>
            {activAlert ? <Alt onClose={onClose} 
                                text={text}/> : ''}

            <Select value={selectedCategory} title='Выбрать категорию' onChange={handleSelectedCategory}>
                <option value='Категории'>Категории</option>
                {arrCategories.map((category) => (
                    <option key={nanoid(7)} value={category}>
                        {category}
                    </option>
                ))}
            </Select><br/>

            <Input placeholder='название' value={inpValueName} onChange={e => setInpValueName(e.target.value)}/>
            <Input type='number' value={inpValueCost} placeholder='цена' onChange={e => setInpValueCost(e.target.value)}/><br/>

            <Button title='Добавить новую запись' onClick={handleAddPurchase} style={{padding: '10px 50px'}}>Добавить запись</Button>

            <Result>
                {time} <b>{getSum()}<span>&#8381;</span></b>
            </Result>

        </div>
    )
}

export default Categories;