import React, { useState } from "react";
import { DeleteOutlined } from '@ant-design/icons';
import { TableSpend, Td, Th, Thead, Button } from "../../AppStyle";

function EditableCell({ value, onChange, isEditable, cost, designation }) {
    const [editing, setEditing] = useState(false);
    const [text, setText] = useState(value);
  
    const handleClick = () => {
        if (isEditable) {
            setEditing(true);
        }
    }
  
    const handleBlur = () => {
        setEditing(false);
        onChange(text);
    }
  
    const handleChange = (event) => {
        setText(event.target.value);
    }
  
    if (editing) {
        if(value === designation || value === cost) {
            return (
                <input type={value === cost ? 'number' : 'text'} value={text} onChange={handleChange} onBlur={handleBlur} autoFocus/>
            )
        } else {
            return (
                <div onClick={handleClick}>{value}</div>
            )
        }
    } else {
        return (
            <div onClick={handleClick}>{value}</div>
        )
    }
}

function Table({ purchases, data, setData }) {

    const handleCellChange = (id, key, value) => {
        const newProds = data.map((purchase) => {
            if (purchase.id === id) {
                return { ...purchase, [key]: value };
            } else {
                return purchase;
            }
        });
        setData(newProds);
        localStorage.setItem('spends', JSON.stringify(newProds));
    }

    function handleDelPurchase(id) {
        let copy = data.filter(elem => elem.id !== id);
        setData(copy);
        localStorage.setItem('spends', JSON.stringify(copy));
    }

    const rows = purchases.map((purchase) => (
      <tr key={purchase.id} draggable>
            <Td><EditableCell value={purchase.date} onChange={(value) => handleCellChange(purchase.id, "date", value)} isEditable={true} /></Td>
            <Td><EditableCell value={purchase.kind} onChange={(value) => handleCellChange(purchase.id, "kind", value)} isEditable={true} /></Td>
            <Td><EditableCell value={purchase.designation} designation={purchase.designation} onChange={(value) => handleCellChange(purchase.id, "designation", value)} isEditable={true} /></Td>
            <Td><EditableCell value={purchase.cost} cost={purchase.cost} onChange={(value) => handleCellChange(purchase.id, "cost", value)} isEditable={true} /></Td>
            <Td>
                <Button del='true' onClick={() => handleDelPurchase(purchase.id)}>
                    <DeleteOutlined />
                </Button>
            </Td>
      </tr>
    ));
  
    return (
        <div>
            <TableSpend>
                <Thead>
                    <tr>
                        <Th>Дата</Th>
                        <Th>Категория</Th>
                        <Th>Название</Th>
                        <Th>Стоимость</Th>
                        <Th><DeleteOutlined /></Th>
                    </tr>
                </Thead>
                <tbody>
                    {rows}
                </tbody>
            </TableSpend>
        </div>
    );
}

export default Table;