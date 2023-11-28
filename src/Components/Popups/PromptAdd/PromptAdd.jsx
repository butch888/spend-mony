import React from 'react';
import { Input } from 'antd';
import { Button } from '../../../AppStyle';
import { PromptAddWrapper } from './PromptAddStyleComponent';

const PromptAdd = ({handleCancel, handleAddCategory, inpValueAddCategory, setInpValueAddCategory}) => (
    
    <PromptAddWrapper>
        <Input style={{width: '250px',}} autoFocus={true} placeholder="Введите название категории" value={inpValueAddCategory} onChange={(e) => setInpValueAddCategory(e.target.value)}/><br/><br/>
        <Button onClick={handleAddCategory}>Добавить</Button>
        <Button onClick={handleCancel}>Отмена</Button>
        <br/><br/>
    </PromptAddWrapper>
);

export default PromptAdd;