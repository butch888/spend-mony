import React from 'react';
import { Input } from 'antd';
import { Button } from './AppStyle';

const PromptAdd = ({handleCancel, handleAddCategory, inpValueAddCategory, setInpValueAddCategory}) => (
    
    <div style={{border: '1.5px solid #05cd51', 
                width: '400px', 
                margin: '0 auto', 
                paddingTop: '15px',
                borderRadius: '5px',
                position: 'absolute',
                left: '14%',
                top: '110px',
                backgroundColor: '#fffbe6',}}>
        <Input style={{width: '250px',}} autoFocus={true} placeholder="Введите название категории" value={inpValueAddCategory} onChange={(e) => setInpValueAddCategory(e.target.value)}/><br/><br/>
        <Button onClick={handleAddCategory}>Добавить</Button>
        <Button onClick={handleCancel}>Отмена</Button>
        <br/><br/>
    </div>
);

export default PromptAdd;