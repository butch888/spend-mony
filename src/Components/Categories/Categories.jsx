import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { date } from '../../date';
import { Input, Button } from '../../AppStyle';
import Alt from '../Popups/Alert/Alert';
import Selects from '../Selects/Selects';
import Table from '../Table/Table';
import { messages, getTranslate } from '../../messages';

function Categories({ selectedCategory, setSelectedCategory, data, setData, purchases, setPurchases, onClose, setText, text, setActiveAlert, activAlert, time, setTime, categories, lang, setIndex}) {

    const [inpValueName, setInpValueName] = useState('');
    const [inpValueCost, setInpValueCost] = useState('');

    const handleAddPurchase = () => {
        if (selectedCategory === getTranslate(lang, messages.category)) {
            setActiveAlert(true);
            setText(getTranslate(lang, messages.selectCategory));
        } else if(inpValueName === '') {
            setActiveAlert(true);
            setText(getTranslate(lang, messages.enterTitle));
        } else if(inpValueCost === '') {
            setActiveAlert(true);
            setText(getTranslate(lang, messages.enterCost));
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
            setText(getTranslate(lang, messages.addPurchases));
        }
    };
    
    return (
        <div>
            {activAlert ? <Alt onClose={onClose} 
                                text={text}/> : ''}

            <Selects time={time} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} lang={lang} setIndex={setIndex}></Selects>

            <Input placeholder={getTranslate(lang, messages.inpPlaceholdetTitle)} value={inpValueName} onChange={e => setInpValueName(e.target.value)}/>
            <Input type='number' value={inpValueCost} placeholder={getTranslate(lang, messages.inpPlaceholdetCost)} onChange={e => setInpValueCost(e.target.value)}/><br/>

            <Button add='true' onClick={handleAddPurchase} style={{padding: '10px 50px'}}>{getTranslate(lang, messages.btnAddPurchase)}</Button><br/><br/>

            <Table selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
              data={data} setData={setData} 
              purchases={purchases} 
              setPurchases={setPurchases}
              setTime={setTime}
              lang={lang}/>

        </div>
    )
}

export default Categories;