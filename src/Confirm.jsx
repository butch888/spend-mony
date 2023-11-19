import React from 'react';
import { Button } from './AppStyle';

const Confirm = ({ selectedCategory, handleNotDelCategory, delCategory }) => (
    
    <div style={{border: '1.5px solid #05cd51', 
                width: '400px', 
                margin: '0 auto', 
                paddingTop: '15px',
                borderRadius: '5px',
                position: 'absolute',
                left: '14%',
                top: '110px',
                backgroundColor: '#fffbe6',}}>
        <p>
            Вы уверены, что хотите удалить категорию "{selectedCategory}"?
        </p>
        <Button onClick={handleNotDelCategory}>Отмена</Button>
        <Button onClick={delCategory}>Да</Button><br/><br/>
    </div>
);

export default Confirm;