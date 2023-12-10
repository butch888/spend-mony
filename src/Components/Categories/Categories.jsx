import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { date } from '../../date';
import { Input, Button, Result } from '../../AppStyle';
import Alt from '../Popups/Alert/Alert';
import Selects from '../Selects/Selects';

function Categories({ selectedCategory, setSelectedCategory, data, setData, purchases, onClose, setText, text, setActiveAlert, activAlert, time, categories, lang, setIndex}) {

    const [inpValueName, setInpValueName] = useState('');
    const [inpValueCost, setInpValueCost] = useState('');

    const handleAddPurchase = () => {
        if (selectedCategory === 'Категории') {
            setActiveAlert(true);
            setText(!lang ? 'Выберите "Категорию!"' : 'Select category!');
        } else if(inpValueName === '') {
            setActiveAlert(true);
            setText(!lang ? 'Введите название покупки!' : 'Enter title!');
        } else if(inpValueCost === '') {
            setActiveAlert(true);
            setText(!lang ? 'Введите стоимость покупки!' : 'Enter Cost!');
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

    let sum = 0;
    function getSum() {
      purchases.map((e) => sum = sum + +e.cost)
      return sum;
    }
    
    return (
        <div>
            {activAlert ? <Alt onClose={onClose} 
                                text={text}/> : ''}

            <Selects time={time} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} lang={lang} setIndex={setIndex}></Selects>

            <Input placeholder={!lang ? 'название' : 'title'} value={inpValueName} onChange={e => setInpValueName(e.target.value)}/>
            <Input type='number' value={inpValueCost} placeholder={!lang ? 'цена' : 'cost'} onChange={e => setInpValueCost(e.target.value)}/><br/>

            <Button add='true' title='Добавить новую запись' onClick={handleAddPurchase} style={{padding: '10px 50px'}}>{!lang ? 'Добавить запись' : 'Add note'}</Button>

            <Result>
            {/* {!lang ? time : 'All categories for today'}<br/><b>{getSum()}<span>&#8381;</span></b> */}
            {time}<br/><b style={{width: '100px',
                                    margin: '0 auto',
                                    border: '1px solid black',
                                    borderRadius: '15px', 
                                    padding: '3px 8px',
                                    display: 'block',
                                    marginTop: '6px'}}>{getSum()}<span>&#8381;</span></b>
            </Result>

        </div>
    )
}

export default Categories;