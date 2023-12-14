import React from 'react';
import { Input } from 'antd';
import { Button } from '../../../AppStyle';
import { PromptEditWrapper } from './PromptEditStyleConponent';
import { getTranslate, messages } from '../../../messages';

const PromptEdit = ({ handleEditCategory, handleCancelEditCategory, inpValueAddCategory, setInpValueAddCategory, lang }) => (
    
    <PromptEditWrapper>
        <p>{getTranslate(lang, messages.promptCategoryEdit)}</p>
        <Input style={{width: '250px',}} autoFocus={true} value={inpValueAddCategory} onChange={(e) => setInpValueAddCategory(e.target.value)}/><br/><br/>
        <Button onClick={handleEditCategory}>{getTranslate(lang, messages.btnEdit)}</Button>
        <Button onClick={handleCancelEditCategory}>{getTranslate(lang, messages.btnConfCancel)}</Button>
        <br/><br/>
    </PromptEditWrapper>
);

export default PromptEdit;