import React from 'react';
import { Button } from '../../../AppStyle';
import { ConfirmWrapper } from './ConfirmStyleComponent';
import { getTranslate, messages } from '../../../messages';


const Confirm = ({ selectedCategory, handleNotDelCategory, delCategory, lang }) => (
    
    <ConfirmWrapper>
        <p>
            {getTranslate(lang, messages.confirmDelCategory) + `"${selectedCategory}"?`}
        </p>
        <Button onClick={handleNotDelCategory}>{getTranslate(lang, messages.btnConfCancel)}</Button>
        <Button onClick={delCategory}>{getTranslate(lang, messages.btnConfYes)}</Button><br/><br/>
    </ConfirmWrapper>
);

export default Confirm;