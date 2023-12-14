import React from 'react';
import { useState } from 'react';
import { PlusOutlined, MinusOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from '../../AppStyle';
import Alt from '../Popups/Alert/Alert';
import PromptAdd from '../Popups/PromptAdd/PromptAdd';
import Confirm from '../Popups/Confirm/Confirm';
import PromptEdit from '../Popups/PromptEdit/PromptEdit';
import Selects from '../Selects/Selects';
import { getTranslate, messages } from '../../messages';

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
                setText(getTranslate(lang, messages.categoryExist));
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
            setText(getTranslate(lang, messages. categoryAdded) + `"${newCategory}"`);
        }
    }

    const handleDelCategory = () => {
        if (selectedCategory === getTranslate(lang, messages.category)) {
            setActiveAlert(true);
            setText(getTranslate(lang, messages.categoryDel));
        } else {
            setActiveConfirm(true);
        }
    };

    function delCategory() {
        let copy = categories.filter(elem => elem !== selectedCategory);
        setCategories(copy);
        localStorage.setItem('category', JSON.stringify(copy));
        setSelectedCategory(getTranslate(lang, messages.category));
        setActiveAlert(true);
        setText(getTranslate(lang, messages.category) + `"${selectedCategory}"` + getTranslate(lang, messages.delCategory));
        let copyPurchases = data.filter(purch => purch.kind !== selectedCategory);
        setData(copyPurchases);
        setActiveConfirm(false);
    }

    function handleNotDelCategory() {
        setActiveConfirm(false);
        setInpValueAddCategory('');
    }

    function handleEditCategory() {
        if (selectedCategory === getTranslate(lang, messages.category)) {
            setActiveAlert(true);
            setText(getTranslate(lang, messages.categoryEdit));
        } else {
            setActivePromptEdit(true);
            setInpValueAddCategory(selectedCategory)
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

            <div style={{marginBottom: '10px'}}>
                <Button onClick={handleDelCategory}><MinusOutlined /></Button>
                <Button onClick={handleEditCategory}><EditOutlined /></Button>
                <Button onClick={addCategory}><PlusOutlined /></Button>
            </div>

        </div>
    )
}

export default EditCategory;