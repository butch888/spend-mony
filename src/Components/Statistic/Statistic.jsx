import {nanoid} from 'nanoid';
import { Select, Button, StatisticWrapper, Period, Result } from "../../AppStyle";
import Selects from "../Selects/Selects";
import { date } from "../../date";

const arrMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const arrYears = [];
for (let i = 2021; i <= 2032; i++) {
    arrYears.push(i);
}

const arrDays = Array.from(Array(31).keys(), num => num + 1);

function Statistic({data, 
                    purchases, setPurchases,  
                    time, setTime,
                    selectedDay, setSelectedDay,
                    selectedMonth, setSelectedMonth,
                    selectedYear, setSelectedYear,
                    getDay, getMonth, getYear,
                    setIsMonth,
                    selectedCategory, setSelectedCategory,
                    categories,
                    lang,
                    index, setIndex }) {        

    let sum = 0;
    function getSum() {
      purchases.map((e) => sum = sum + +e.cost)
      return sum;
    }
   
    function handleToday(e) {
        setIndex(e.target.id);
        if (selectedCategory === 'Категории'){
            let copy = data.filter(elem => getDay(elem.date) === new Date().getDate());
            setPurchases(copy);
            setTime('Все категории за сегодня:');
        } else if (selectedCategory === 'Categories'){
            let copy = data.filter(elem => getDay(elem.date) === new Date().getDate());
            setPurchases(copy);
            setTime('All categories for today:');
        } else {
            let copy = data.filter(elem => getDay(elem.date) === new Date().getDate() && elem.kind === selectedCategory);
            setPurchases(copy);
            setTime(! lang ? `Категория "${selectedCategory}" за сегодня:` : `Category "${selectedCategory}" for today:`);
        } 
    }
 
    function handleMonth(e) {
        setIndex(e.target.id);
        setIsMonth(true);
        if(selectedCategory !== 'Категории' && selectedCategory !== 'Categories') {
            let copy = data.filter(elem => getMonth(elem.date) === new Date().getMonth() + 1 && elem.kind === selectedCategory && getYear(elem.date) === new Date().getFullYear());
            setPurchases(copy);
            setTime(!lang ? `Категория "${selectedCategory}" за этот месяц:` : `Category "${selectedCategory}" for current month:`);
        } else {
            let copy = data.filter(elem => getMonth(elem.date) === new Date().getMonth() + 1 && getYear(elem.date) === new Date().getFullYear())
            setPurchases(copy);
            setTime(!lang ? 'Все категории за этот месяц:' : 'All categories for current month:');
        }
    }

    function handleYear(e) {
        setIndex(e.target.id);
        if (selectedCategory === 'Категории') {
            let copy = data.filter(elem => getYear(elem.date) === new Date().getFullYear())
            setPurchases(copy);
            setTime('Все категории за этот год:');
        } else if (selectedCategory === 'Categories') {
            let copy = data.filter(elem => getYear(elem.date) === new Date().getFullYear())
            setPurchases(copy);
            setTime('All categories for current year:');
        } else {
            let copy = data.filter(elem => getYear(elem.date) === new Date().getFullYear() && elem.kind === selectedCategory);
            setPurchases(copy);
            setTime(!lang ? `Категория "${selectedCategory}" за этот год:` : `Category "${selectedCategory}" for current year:`);
        } 
    }

    function handleAllTime(e) {
        setIndex(e.target.id);
        if(selectedCategory === 'Категории') {
            setPurchases(data);
            // setSelectedMonth(month);
            // setSelectedYear(year);
            // setSelectedDay(day);
            setTime('Все категории за все время:')
        } else if(selectedCategory === 'Categories') {
            setPurchases(data);
            // setSelectedMonth(month);
            // setSelectedYear(year);
            // setSelectedDay(day);
            setTime('All categories for all time:')
        } else {
            let copy = data.filter(elem => elem.kind === selectedCategory);
            setPurchases(copy);
            // setSelectedMonth(month);
            // setSelectedYear(year);
            // setSelectedDay(day);
            setTime(!lang ? `Категория "${selectedCategory}" за все время:` : `Category "${selectedCategory}" for all time:`)
        }
    }

    function handleSelectedDay(e) {
        setSelectedDay(e.target.value);
        if (index === "btnSearch") {
            setIndex('');
        }
    }

    function handleSelectedMonth(e) {
        setSelectedMonth(e.target.value);
        if (index === "btnSearch") {
            setIndex('');
        }
    }

    function handleSelectedYear(e) {
        setSelectedYear(e.target.value);
        if (index === "btnSearch") {
            setIndex('');
        }
    }

    function handleSearch(e) {
        setIndex(e.target.id);
        if(selectedCategory === 'Категории' || selectedCategory === 'Categories') {
            let copy = data.filter(elem => getDay(elem.date) === +selectedDay && getMonth(elem.date) === +selectedMonth && getYear(elem.date) === +selectedYear);
            setPurchases(copy);
        } else {
            let copy = data.filter(elem => getDay(elem.date) === +selectedDay && getMonth(elem.date) === +selectedMonth && getYear(elem.date) === +selectedYear && selectedCategory === elem.kind);
            setPurchases(copy);
        }

        if(selectedDay === day && selectedMonth === month && selectedYear === year) {
            setTime(date);
        } else {
            setTime(`${selectedDay}.${selectedMonth}.${selectedYear}`)
        }
    }

    let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    if (month === 9) {
        month = 10;
    }
    if (month > 0 && month < 10) {
        month = '0' + (month);
    } 
    
    const bgCol = '#014707';

    return (
        <div> 
            <Selects selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories} lang={lang} index={index} setIndex={setIndex} ></Selects>

            <StatisticWrapper>
                <Button id="btnToday" style={index === 'btnToday' ? {backgroundColor: bgCol} : {backgroundColor: ''}} onClick={handleToday}>{!lang ? 'Сегодня' : 'Today'}</Button>
                <Button id="btnMonth" style={index === 'btnMonth' ? {backgroundColor: bgCol} : {backgroundColor: ''}} onClick={handleMonth}>{!lang ? 'Этот месяц' : 'Current month'}</Button>
                <Button id="btnYear" style={index === 'btnYear' ? {backgroundColor: bgCol} : {backgroundColor: ''}} onClick={handleYear}>{!lang ? 'Этот год' : 'Current year'}</Button>
                <Button id="btnAllTime" style={index === 'btnAllTime' ? {backgroundColor: bgCol} : {backgroundColor: ''}} onClick={handleAllTime}>{!lang ? 'За все время' : 'All time'}</Button>
            </StatisticWrapper>

            <Period>
                <div>
                    <Select slct='true' value={selectedDay} onChange={handleSelectedDay}>
                        <option>{selectedDay}</option>
                        {arrDays.map((day) => (
                            <option key={nanoid(4)} value={day}>
                                {day}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select slct='true' value={selectedMonth} onChange={handleSelectedMonth}>
                        <option>{selectedMonth}</option>
                        {arrMonth.map((month) => (
                            <option key={nanoid(4)} value={month}>
                                {month}
                            </option>
                        ))}
                    </Select>
                </div>
                <div>
                    <Select slct='true' value={selectedYear} onChange={handleSelectedYear}>
                        <option>{selectedYear}</option>
                        {arrYears.map((year) => (
                            <option key={nanoid(4)} value={year}>
                                {year}
                            </option>
                        ))}
                    </Select>
                </div>
             </Period>

            <Button id="btnSearch" style={index === 'btnSearch' ? {backgroundColor: bgCol} : {backgroundColor: ''}}  onClick={handleSearch}>{!lang ? 'Найти' : 'Search'}</Button>
            
            <Result>
            {time} <br/> <b style={{width: '100px',
                                    margin: '0 auto',
                                    border: '1px solid black',
                                    borderRadius: '15px', 
                                    padding: '3px 8px',
                                    display: 'block',
                                    marginTop: '6px'}}>{getSum()}<span>&#8381;</span></b>
            </Result>
        </div>
        
        
    )
};

export default Statistic;