import React from 'react';
import { useState } from 'react';
import {nanoid} from 'nanoid';
import { PlusOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { date } from '../../date';
import { Input, Select, Button } from '../../AppStyle';
import Alt from '../../Alert';
import PromptAdd from '../../PromptAdd';
import Confirm from '../../Confirm';
import PromptEdit from '../../PromptEdit';

function Categories({ selectedCategory, setSelectedCategory, data, setData, setPurchases, onClose, setText, text, setActiveAlert, activAlert }) {

    let ctg = localStorage.getItem('categories');

    if(ctg === null) {
        localStorage.setItem('categories', JSON.stringify(['Продукты', 'Топливо', 'Развлечения', 'Ремонт']));
    }

    let strCategories = localStorage.getItem('categories');
    let arrCategories = JSON.parse(strCategories)

    const [categories, setCategories] = useState(arrCategories);
    const [inpValueName, setInpValueName] = useState('');
    const [inpValueCost, setInpValueCost] = useState('');
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

        if (newCategory.trim() === '') return;
            
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
            localStorage.setItem('categories', JSON.stringify([...categories, newCategory]))
            setCategories([...categories, newCategory]);
            setSelectedCategory(newCategory);
            setActiveAlert(true);
            setActivePromptAdd(false);
            setInpValueAddCategory('');
            setText(`Вы добавили категорию "${newCategory}"`);
        }
    }

    const handleDelCategory = () => {
        if(selectedCategory === 'Категории') {
            setActiveAlert(true);
            setText('Чтобы удалить категорию, выберите категорию, которую хотите удалить!');
        } else {
            setActiveConfirm(true);
        }
    };

    function delCategory() {
        let copy = categories.filter(elem => elem !== selectedCategory);
        setCategories(copy);
        localStorage.setItem('categories', JSON.stringify(copy));
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
        if(selectedCategory === 'Категории') {
            setActiveAlert(true);
            setText('Чтобы изменить категорию, выберите категорию!');
        } else {
            setActivePromptEdit(true);
            if(inpValueAddCategory !== '' && activPromptEdit === true) {
                const newCategory = inpValueAddCategory.trim()[0].toUpperCase() + inpValueAddCategory.slice(1, inpValueAddCategory.length);
                let copy = [...categories];
                copy[copy.indexOf(selectedCategory)] = newCategory;
                setCategories(copy);
                localStorage.setItem('categories', JSON.stringify(copy));
                setSelectedCategory(newCategory);

                let copyPurchases = data.map((purch) => {
                    if(purch.kind === selectedCategory) {
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

    const handleAddPurchase = () => {
        if(selectedCategory === 'Категории') {
            setActiveAlert(true);
            setText('Для добавления новой записи, выберите "Категорию!"');
        } else if(inpValueName === '') {
            setActiveAlert(true);
            setText('Для добавления новой записи, введите название покупки!');
        } else if(inpValueCost === '') {
            setActiveAlert(true);
            setText('Для добавления новой записи, введите стоимость покупки!');
        } else {
            let copy = [...data, {id: nanoid(5), isChecked: false, date: date, designation: inpValueName, kind: selectedCategory, cost: inpValueCost}];
            setData(copy);
            localStorage.setItem('spends', JSON.stringify(copy));
            setInpValueName('');
            setInpValueCost('');
            setSelectedCategory('Категории');
            onClose();
            setActiveAlert(true);
            setText('Запись успешно добавлена.')
        }
    };

    function handleSelectedCategory(e) {
        setSelectedCategory(e.target.value);
    }

    function handleCancel() {
        setActivePromptAdd(false);
        setInpValueAddCategory('');
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

            <Input placeholder='название' value={inpValueName} onChange={e => setInpValueName(e.target.value)}/>
            <Input type='number' value={inpValueCost} placeholder='цена' onChange={e => setInpValueCost(e.target.value)}/><br/>
    
            <Button title='Удалить категорию' onClick={handleDelCategory}><MinusOutlined /></Button>

            <Select value={selectedCategory} title='Выбрать категорию' onChange={handleSelectedCategory}>
                <option value='Категории'>Категории</option>
                {categories.map((category) => (
                    <option key={nanoid(7)} value={category}>
                        {category}
                    </option>
                ))}
            </Select>

            <Button title='Добавить категорию' onClick={addCategory}><PlusOutlined /></Button><br/>
            <Button title='Редактировать категорию' onClick={handleEditCategory}><EditOutlined /></Button><br/>

            <Button title='Добавить новую запись' onClick={handleAddPurchase}>Добавить запись</Button>

        </div>
    )
}

export default Categories;