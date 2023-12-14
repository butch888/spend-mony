import React from 'react';
import { Input } from 'antd';
import { Button } from '../../../AppStyle';
import { PromptAddWrapper } from './PromptAddStyleComponent';
import { getTranslate, messages } from '../../../messages';

const PromptAdd = ({handleCancel, handleAddCategory, inpValueAddCategory, setInpValueAddCategory, lang}) => (
    
    <PromptAddWrapper>
        <Input style={{width: '250px',}} autoFocus={true} placeholder={getTranslate(lang, messages.promptCategoryAdd)} value={inpValueAddCategory} onChange={(e) => setInpValueAddCategory(e.target.value)}/><br/><br/>
        <Button onClick={handleAddCategory}>{getTranslate(lang, messages.btnPromptAdd)}</Button>
        <Button onClick={handleCancel}>{getTranslate(lang, messages.btnConfCancel)}</Button>
        <br/><br/>
    </PromptAddWrapper>
);

export default PromptAdd;