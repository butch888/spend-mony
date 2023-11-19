import React from 'react';
import { Input } from 'antd';
import { Button } from './AppStyle';

const PromptEdit = ({ handleEditCategory, handleCancelEditCategory, inpValueAddCategory, setInpValueAddCategory, selectedCategory }) => (
    
    <div style={{border: '1.5px solid #05cd51', 
                width: '400px', 
                margin: '0 auto', 
                paddingTop: '15px',
                borderRadius: '5px',
                position: 'absolute',
                left: '14%',
                top: '110px',
                backgroundColor: '#fffbe6',}}>
        <p>Измените название категории:</p>
        <Input style={{width: '250px',}} autoFocus={true} placeholder={selectedCategory} value={inpValueAddCategory} onChange={(e) => setInpValueAddCategory(e.target.value)}/><br/><br/>
        <Button onClick={handleEditCategory}>Изменить</Button>
        <Button onClick={handleCancelEditCategory}>Отмена</Button>
        <br/><br/>
    </div>
);

export default PromptEdit;