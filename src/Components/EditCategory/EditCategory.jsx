import React from 'react';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { PlusOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { Select, Button, Result } from '../../AppStyle';
import Alt from '../Popups/Alert/Alert';
import PromptAdd from '../Popups/PromptAdd/PromptAdd';
import Confirm from '../Popups/Confirm/Confirm';
import PromptEdit from '../Popups/PromptEdit/PromptEdit';
import { arrCategories } from '../../data';

function EditCategory({ selectedCategory, setSelectedCategory, data, setData, setPurchases, purchases, onClose, setText, text, setActiveAlert, activAlert, time }) {

    const [categories, setCategories] = useState(arrCategories);
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
                setText('Такая категория уже существует!');
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
            setText(`Вы добавили категорию "${newCategory}"`);
        }
    }

    const handleDelCategory = () => {
        if (selectedCategory === 'Категории') {
            setActiveAlert(true);
            setText('Чтобы удалить категорию, выберите категорию, которую хотите удалить!');
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
        setText(`Категория "${selectedCategory}" удалена!`);
        let copyPurchases = data.filter(purch => purch.kind !== selectedCategory);
        setData(copyPurchases);
        setActiveConfirm(false);
    }

    function handleNotDelCategory() {
        setActiveConfirm(false);
        setInpValueAddCategory('');
    }

    function handleEditCategory() {
        if (selectedCategory === 'Категории') {
            setActiveAlert(true);
            setText('Чтобы изменить категорию, выберите категорию!');
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

    function handleSelectedCategory(e) {
        setSelectedCategory(e.target.value);
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
                                        setInpValueAddCategory={setInpValueAddCategory}/> : ''}

            {activConfirm ? <Confirm delCategory={delCategory} 
                                    selectedCategory={selectedCategory} 
                                    handleNotDelCategory={handleNotDelCategory}/> : ''}

            {activPromptEdit ? <PromptEdit handleEditCategory={handleEditCategory} 
                                            selectedCategory={selectedCategory} 
                                            handleCancelEditCategory={handleCancelEditCategory} 
                                            inpValueAddCategory={inpValueAddCategory} 
                                            setInpValueAddCategory={setInpValueAddCategory}/> : ''}

            <Select value={selectedCategory} title='Выбрать категорию' onChange={handleSelectedCategory}>
                <option value='Категории'>Категории</option>
                {categories.map((category) => (
                    <option key={nanoid(7)} value={category}>
                        {category}
                    </option>
                ))}
            </Select><br/>

            <Button title='Удалить категорию' onClick={handleDelCategory}><MinusOutlined /></Button>
            <Button title='Редактировать категорию' onClick={handleEditCategory}><EditOutlined /></Button>
            <Button title='Добавить категорию' onClick={addCategory}><PlusOutlined /></Button>

            <Result>
                {time} <b>{getSum()}<span>&#8381;</span></b>
            </Result>

        </div>
    )
}

export default EditCategory;