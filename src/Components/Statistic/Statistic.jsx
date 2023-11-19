import React from "react";
import {nanoid} from 'nanoid';
import { Select, Button, StatisticWrapper, Period, Result } from "../../AppStyle";

const arrMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const arrYears = [];
for (let i = 2021; i <= 2032; i++) {
    arrYears.push(i);
}

const arrDays = Array.from(Array(31).keys(), num => num + 1);

function Statistic({data, 
                    setPurchases, 
                    selectedCategory, 
                    time, setTime, 
                    onClose, 
                    activAlert, setActiveAlert, 
                    text, setText,
                    selectedDay, setSelectedDay,
                    selectedMonth, setSelectedMonth,
                    selectedYear, setSelectedYear,
                    getDay, getMonth, getYear,
                    isMonth, setIsMonth }) {

    function handleToday() {
        if(selectedCategory !== 'Категории') {
            let copy = data.filter(elem => getDay(elem.date) === new Date().getDate() && elem.kind === selectedCategory);
            setPurchases(copy);
            setTime(`Категория "${selectedCategory}" за сегодня:`);
        } else {
            let copy = data.filter(elem => getDay(elem.date) === new Date().getDate());
            setPurchases(copy);
            setTime('Все категории за сегодня:');
        } 
    }

    function handleMonth() {
        setIsMonth(true);
        if(selectedCategory !== 'Категории') {
            let copy = data.filter(elem => getMonth(elem.date) === new Date().getMonth() + 1 && elem.kind === selectedCategory && getYear(elem.date) === new Date().getFullYear());
            setPurchases(copy);
            setTime(`Категория "${selectedCategory}" за этот месяц:`);
        } else {
            let copy = data.filter(elem => getMonth(elem.date) === new Date().getMonth() + 1 && getYear(elem.date) === new Date().getFullYear())
            setPurchases(copy);
            setTime('Все категории за этот месяц:');
        }
    }
    console.log(new Date().getMonth())
    function handleYear() {
        if(selectedCategory !== 'Категории') {
            let copy = data.filter(elem => getYear(elem.date) === new Date().getFullYear() && elem.kind === selectedCategory);
            setPurchases(copy);
            setTime(`Категория "${selectedCategory}" за этот год:`);
        } else {
            let copy = data.filter(elem => getYear(elem.date) === new Date().getFullYear())
            setPurchases(copy);
            setTime('Все категории за этот год:');
        }
    }

    function handleAllTime() {
        if(selectedCategory === 'Категории') {
            setPurchases(data);
            setSelectedMonth('Месяц');
            setSelectedYear('Год');
            setSelectedDay('День');
            setTime('Все категории за все время:')
        } else {
            let copy = data.filter(elem => elem.kind === selectedCategory);
            setPurchases(copy);
            setSelectedMonth('Месяц');
            setSelectedYear('Год');
            setSelectedDay('День');
            setTime(`Категория "${selectedCategory}" за все время:`)
        }
    }

    function handleSelectedDay(e) {
        setSelectedDay(e.target.value);
    }

    function handleSelectedMonth(e) {
        setSelectedMonth(e.target.value);
    }

    function handleSelectedYear(e) {
        setSelectedYear(e.target.value);
    }

    function handleSearch() {
        if(selectedDay !== 'День' && selectedMonth !== 'Месяц' && selectedYear !== 'Год') {
            if(selectedCategory !== 'Категории') {
                let copy = data.filter(elem => getDay(elem.date) === +selectedDay && getMonth(elem.date) === +selectedMonth && getYear(elem.date) === +selectedYear && selectedCategory === elem.kind);
                setPurchases(copy);
            } else {
                let copy = data.filter(elem => getDay(elem.date) === +selectedDay && getMonth(elem.date) === +selectedMonth && getYear(elem.date) === +selectedYear);
                setPurchases(copy);
            }
        } else if(selectedMonth !== 'Месяц' && selectedYear !== 'Год') {
            let copy = data.filter(elem => getMonth(elem.date) === +selectedMonth && getYear(elem.date) === +selectedYear);
            setPurchases(copy);
        } else if(selectedYear !== 'Год') {
            let copy = data.filter(elem => getYear(elem.date) === +selectedYear && elem.kind === selectedCategory);
            setPurchases(copy);
            if (selectedCategory === 'Категории') {
                let copy = data.filter(elem => getYear(elem.date) === +selectedYear);
                setPurchases(copy);
            }
        } else if(selectedMonth === 'Месяц') {
            setActiveAlert(true);
            setText('Выберите месяц!');
        } else if(selectedYear === 'Год') {
            setActiveAlert(true);
            setText('Выберите год!');
        }
        setTime('');
    }

    return (
        <div>
            <StatisticWrapper>
                <h3>Статистика</h3>
                <Button onClick={handleToday}>Сегодня</Button>
                <Button onClick={handleMonth}>Этот месяц</Button>
                <Button onClick={handleYear}>Этот год</Button>
                <Button onClick={handleAllTime}>За все время</Button>
            </StatisticWrapper>

            <Period>
                <div>
                    <Select value={selectedDay} onChange={handleSelectedDay}>
                        <option>День</option>
                        {arrDays.map((day) => (
                            <option key={nanoid(4)} value={day}>
                                {day}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select value={selectedMonth} onChange={handleSelectedMonth}>
                        <option>Месяц</option>
                        {arrMonth.map((month) => (
                            <option key={nanoid(4)} value={month}>
                                {month}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select value={selectedYear} onChange={handleSelectedYear}>
                        <option>Год</option>
                        {arrYears.map((year) => (
                            <option key={nanoid(4)} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                </div>
             </Period>

            <Button onClick={handleSearch}>Найти</Button>
            
            <Result>
                {time}
            </Result>
        </div>
        
        
    )
};

export default Statistic;