import React from 'react';
import { Button } from '../../../AppStyle';
import { ConfirmWrapper } from './ConfirmStyleComponent';

const Confirm = ({ selectedCategory, handleNotDelCategory, delCategory, lang }) => (
    
    <ConfirmWrapper>
        <p>
            {!lang ? `Вы уверены, что хотите удалить категорию "${selectedCategory}"?` : `Are you sure you want to delete the category "${selectedCategory}"?`}
        </p>
        <Button onClick={handleNotDelCategory}>{!lang ? 'Отмена' : 'Cancel'}</Button>
        <Button onClick={delCategory}>Да</Button><br/><br/>
    </ConfirmWrapper>
);

export default Confirm;