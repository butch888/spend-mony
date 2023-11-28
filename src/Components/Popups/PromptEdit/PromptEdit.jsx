import React from 'react';
import { Input } from 'antd';
import { Button } from '../../../AppStyle';
import { PromptEditWrapper } from './PromptEditStyleConponent';

const PromptEdit = ({ handleEditCategory, handleCancelEditCategory, inpValueAddCategory, setInpValueAddCategory, selectedCategory }) => (
    
    <PromptEditWrapper>
        <p>Измените название категории:</p>
        <Input style={{width: '250px',}} autoFocus={true} placeholder={selectedCategory} value={inpValueAddCategory} onChange={(e) => setInpValueAddCategory(e.target.value)}/><br/><br/>
        <Button onClick={handleEditCategory}>Изменить</Button>
        <Button onClick={handleCancelEditCategory}>Отмена</Button>
        <br/><br/>
    </PromptEditWrapper>
);

export default PromptEdit;