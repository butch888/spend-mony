import React from 'react';
import { Button } from '../../../AppStyle';
import { ConfirmWrapper } from './ConfirmStyleComponent';

const Confirm = ({ selectedCategory, handleNotDelCategory, delCategory }) => (
    
    <ConfirmWrapper>
        <p>
            Вы уверены, что хотите удалить категорию "{selectedCategory}"?
        </p>
        <Button onClick={handleNotDelCategory}>Отмена</Button>
        <Button onClick={delCategory}>Да</Button><br/><br/>
    </ConfirmWrapper>
);

export default Confirm;