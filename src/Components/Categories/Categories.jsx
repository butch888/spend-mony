import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { date } from '../../date';
import { Input, Button, Result } from '../../AppStyle';
import Alt from '../Popups/Alert/Alert';
import Selects from '../Selects/Selects';
import Table from '../Table/Table';
import { messages, getTranslate } from '../../messages';

function Categories({ selectedCategory, setSelectedCategory, data, setData, purchases, setPurchases, onClose, setText, text, setActiveAlert, activAlert, time, setTime, categories, lang, setIndex}) {

    const [inpValueName, setInpValueName] = useState('');
    const [inpValueCost, setInpValueCost] = useState('');
    const handleAddPurchase = () => {
        if (selectedCategory === messages.category.ru || selectedCategory === messages.category.en) {
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

            <Input placeholder={!lang ? messages.inpPlaceholdetTitle.ru : messages.inpPlaceholdetTitle.en} value={inpValueName} onChange={e => setInpValueName(e.target.value)}/>
            <Input type='number' value={inpValueCost} placeholder={!lang ? messages.inpPlaceholdetCost.ru : messages.inpPlaceholdetCost.en} onChange={e => setInpValueCost(e.target.value)}/><br/>

            <Button add='true' onClick={handleAddPurchase} style={{padding: '10px 50px'}}>{getTranslate(lang, messages.btnAddPurchase)}</Button>

            <Result>
                {time}<br/>
                <b style={{width: '100px',
                            margin: '0 auto',
                            border: '1px solid black',
                            borderRadius: '15px', 
                            padding: '3px 8px',
                            display: 'block',
                            marginTop: '6px'}}>{getSum()}
                    <span>&#8381;</span>
                </b>
            </Result>

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