import React from 'react';
import { Input } from 'antd';
import { Button } from '../../../AppStyle';
import { PromptEditWrapper } from './PromptEditStyleConponent';

const PromptEdit = ({ handleEditCategory, handleCancelEditCategory, inpValueAddCategory, setInpValueAddCategory, selectedCategory, lang }) => (
    
    <PromptEditWrapper>
        <p>{!lang ? 'Измените название категории' : 'Edit category'}</p>
        <Input style={{width: '250px',}} autoFocus={true} placeholder={selectedCategory} value={inpValueAddCategory} onChange={(e) => setInpValueAddCategory(e.target.value)}/><br/><br/>
        <Button onClick={handleEditCategory}>{!lang ? 'Изменить' : 'Edit'}</Button>
        <Button onClick={handleCancelEditCategory}>{!lang ? 'Отмена' : 'Cancel'}</Button>
        <br/><br/>
    </PromptEditWrapper>
);

export default PromptEdit;