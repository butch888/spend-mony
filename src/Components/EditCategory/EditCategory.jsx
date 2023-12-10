import React from 'react';
import { useState } from 'react';
import { PlusOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Result } from '../../AppStyle';
import Alt from '../Popups/Alert/Alert';
import PromptAdd from '../Popups/PromptAdd/PromptAdd';
import Confirm from '../Popups/Confirm/Confirm';
import PromptEdit from '../Popups/PromptEdit/PromptEdit';
import Selects from '../Selects/Selects';

function EditCategory({ selectedCategory, setSelectedCategory, data, setData, setPurchases, purchases, onClose, setText, text, setActiveAlert, activAlert, time, categories, setCategories, lang }) {

    const [activPromptAdd, setActivePromptAdd] = useState(false);
    const [activPromptEdit, setActivePromptEdit] = useState(false);
    const [activConfirm, setActiveConfirm] = useState(false);
    const [inpValueAddCategory, setInpValueAddCategory] = useState('');

    const addCategory = () => {
        setActivePromptAdd(true);
    };

    function handleAddCategory() {
        const value = (inpValueAddCategory.trim());
        const newCategory = value.slice(0, 1).toUpperCase() + value.slice(1, value.length).toLowerCase();

        if (newCategory === '') return;
            
        let isCategoryExist = false;

        for (let i = 0; i < categories.length; i++) {
            if (categories[i] === newCategory) {
                isCategoryExist = true;
                setActiveAlert(true);
                setText(!lang ? 'Такая категория уже существует!' : 'This category already exists!');
                setActivePromptAdd(false);
                setSelectedCategory(newCategory);
                setInpValueAddCategory('');
                break;
            }
        }

        if (!isCategoryExist) {
            localStorage.setItem('category', JSON.stringify([...categories, newCategory]))
            setCategories([...categories, newCategory]);
            setSelectedCategory(newCategory);
            setActiveAlert(true);
            setActivePromptAdd(false);
            setInpValueAddCategory('');
            setText(!lang ? `Вы добавили категорию "${newCategory}"` : `Category "${newCategory}" added: `);
        }
    }

    const handleDelCategory = () => {
        if (selectedCategory === 'Категории' || selectedCategory === 'Categories') {
            setActiveAlert(true);
            setText(!lang ? 'Выберите категорию для удаления!' : 'Select category to delete!');
        } else {
            setActiveConfirm(true);
        }
    };

    function delCategory() {
        let copy = categories.filter(elem => elem !== selectedCategory);
        setCategories(copy);
        localStorage.setItem('category', JSON.stringify(copy));
        setSelectedCategory('Категории');
        setActiveAlert(true);
        setText(!lang ? `Категория "${selectedCategory}" удалена!` : `Category "${selectedCategory}" deleted!`);
        let copyPurchases = data.filter(purch => purch.kind !== selectedCategory);
        setData(copyPurchases);
        setActiveConfirm(false);
    }

    function handleNotDelCategory() {
        setActiveConfirm(false);
        setInpValueAddCategory('');
    }

    function handleEditCategory() {
        if (selectedCategory === 'Категории' || selectedCategory === 'Categories') {
            setActiveAlert(true);
            setText(!lang ? 'Чтобы изменить категорию, выберите категорию!' : 'Select a category to edit!');
        } else {
            setActivePromptEdit(true);
            if (inpValueAddCategory !== '' && activPromptEdit === true) {
                const newCategory = inpValueAddCategory.trim()[0].toUpperCase() + inpValueAddCategory.slice(1, inpValueAddCategory.length);
                let copy = [...categories];
                copy[copy.indexOf(selectedCategory)] = newCategory;
                setCategories(copy);
                localStorage.setItem('category', JSON.stringify(copy));
                setSelectedCategory(newCategory);

                let copyPurchases = data.map((purch) => {
                    if (purch.kind === selectedCategory) {
                        purch.kind = newCategory;
                    }
                    return purch;
                });
                setPurchases(copyPurchases.filter(purch => purch.kind === newCategory));
                setActivePromptEdit(false);
                setInpValueAddCategory('');
            }
        }
    }

    function handleCancelEditCategory() {
        setActivePromptEdit(false);
        setInpValueAddCategory('');
    }

    function handleCancel() {
        setActivePromptAdd(false);
        setInpValueAddCategory('');
    }

    let sum = 0;
    function getSum() {
      purchases.map((e) => sum = sum + +e.cost)
      return sum;
    }
    
    return (
        <div>
            {activAlert ? <Alt onClose={onClose} 
                                text={text}/> : ''}

            {activPromptAdd ? <PromptAdd handleCancel={handleCancel} 
                                        handleAddCategory={handleAddCategory} 
                                        inpValueAddCategory={inpValueAddCategory} 
                                        setInpValueAddCategory={setInpValueAddCategory}
                                        lang={lang}/> : ''}

            {activConfirm ? <Confirm delCategory={delCategory} 
                                    selectedCategory={selectedCategory} 
                                    handleNotDelCategory={handleNotDelCategory}
                                    lang={lang}/> : ''}

            {activPromptEdit ? <PromptEdit handleEditCategory={handleEditCategory} 
                                            selectedCategory={selectedCategory} 
                                            handleCancelEditCategory={handleCancelEditCategory} 
                                            inpValueAddCategory={inpValueAddCategory} 
                                            setInpValueAddCategory={setInpValueAddCategory}
                                            lang={lang}/> : ''}

<Selects time={time} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} lang={lang}></Selects>

            <Button title='Удалить категорию' onClick={handleDelCategory}><MinusOutlined /></Button>
            <Button title='Редактировать категорию' onClick={handleEditCategory}><EditOutlined /></Button>
            <Button title='Добавить категорию' onClick={addCategory}><PlusOutlined /></Button>

            <Result>
                {!lang ? time : 'All categories for today'} <br/> <b 
                                    style={{width: '100px',
                                    margin: '0 auto',
                                    border: '1px solid black',
                                    borderRadius: '15px', 
                                    padding: '3px 8px',
                                    display: 'block',
                                    marginTop: '6px'}}>{getSum()}<span>&#8381;</span></b>
            </Result>

        </div>
    )
}

export default EditCategory;