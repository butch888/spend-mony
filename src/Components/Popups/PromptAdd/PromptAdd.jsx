import React from 'react';
import { Input } from 'antd';
import { Button } from '../../../AppStyle';
import { PromptAddWrapper } from './PromptAddStyleComponent';

const PromptAdd = ({handleCancel, handleAddCategory, inpValueAddCategory, setInpValueAddCategory, lang}) => (
    
    <PromptAddWrapper>
        <Input style={{width: '250px',}} autoFocus={true} placeholder={!lang ? "Введите название категории" : 'Enter category name'} value={inpValueAddCategory} onChange={(e) => setInpValueAddCategory(e.target.value)}/><br/><br/>
        <Button onClick={handleAddCategory}>{!lang ? 'Добавить' : 'Add'}</Button>
        <Button onClick={handleCancel}>{!lang ? 'Отмена' : 'Cancel'}</Button>
        <br/><br/>
    </PromptAddWrapper>
);

export default PromptAdd;