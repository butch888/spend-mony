import {nanoid} from 'nanoid';
import { Select, Button, StatisticWrapper, Period, Result } from "../../AppStyle";
import Selects from "../Selects/Selects";
import { date } from "../../date";
import Table from '../Table/Table';
import { getTranslate, messages } from '../../messages';



const arrMonth = [];
for (let i = 0; i <= 12; i++) {
    arrMonth.push(i);
}

const arrYears = [];
for (let i = 2021; i <= 2032; i++) {
    arrYears.push(i);
}

const arrDays = [];
for (let i = 0; i <= 31; i++) {
    arrDays.push(i);
}

function Statistic({data, setData,
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
        if (selectedCategory === getTranslate(lang, messages.category)){
            let copy = data.filter(elem => getDay(elem.date) === new Date().getDate());
            setPurchases(copy);
            setTime(getTranslate(lang, messages.period) + getTranslate(lang, messages.category).toLowerCase() + getTranslate(lang, messages.today));
        } else {
            let copy = data.filter(elem => getDay(elem.date) === new Date().getDate() && elem.kind === selectedCategory);
            setPurchases(copy);
            setTime(getTranslate(lang, messages.nowCategory) + `"${selectedCategory}"` + getTranslate(lang, messages.today));
        } 
    }
    
    function handleMonth(e) {
        setIndex(e.target.id);
        setIsMonth(true);
        if (selectedCategory === getTranslate(lang, messages.category)) {
            let copy = data.filter(elem => getMonth(elem.date) === new Date().getMonth() + 1 && getYear(elem.date) === new Date().getFullYear());
            setPurchases(copy);
            setTime(getTranslate(lang, messages.period) + getTranslate(lang, messages.category).toLowerCase() + getTranslate(lang, messages.month));
        } else {
            let copy = data.filter(elem => getMonth(elem.date) === new Date().getMonth() + 1 && elem.kind === selectedCategory && getYear(elem.date) === new Date().getFullYear());
            setPurchases(copy);
            setTime(getTranslate(lang, messages.nowCategory) + `"${selectedCategory}"` + getTranslate(lang, messages.month));
        } 
    }

    function handleYear(e) {
        setIndex(e.target.id);
        if (selectedCategory === getTranslate(lang, messages.category)){
            let copy = data.filter(elem => getYear(elem.date) === new Date().getFullYear());
            setPurchases(copy);
            setTime(getTranslate(lang, messages.period) + getTranslate(lang, messages.category).toLowerCase() + getTranslate(lang, messages.year));
        } else {
            let copy = data.filter(elem => getYear(elem.date) === new Date().getFullYear() && elem.kind === selectedCategory);
            setPurchases(copy);
            setTime(getTranslate(lang, messages.nowCategory) + `"${selectedCategory}"` + getTranslate(lang, messages.year));
        } 
    }

    function handleAllTime(e) {
        setIndex(e.target.id);
        if (selectedCategory === getTranslate(lang, messages.category)){
            setPurchases(data);
            setTime(getTranslate(lang, messages.period) + getTranslate(lang, messages.category).toLowerCase() + getTranslate(lang, messages.allTime));
        } else {
            let copy = data.filter(elem => elem.kind === selectedCategory);
            setPurchases(copy);
            setTime(getTranslate(lang, messages.nowCategory) + `"${selectedCategory}"` + getTranslate(lang, messages.allTime));
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
        if(selectedCategory === getTranslate(lang, messages.category)) {
            if (+selectedDay === 0 && +selectedMonth !== 0 && +selectedYear !== 0) {
                let copy = data.filter(elem => getMonth(elem.date) === +selectedMonth && getYear(elem.date) === +selectedYear);
                setPurchases(copy);
            } else if (+selectedDay === 0 && +selectedMonth === 0 && +selectedYear !== 0) {
                let copy = data.filter(elem => getYear(elem.date) === +selectedYear);
                setPurchases(copy);
            } else {
                let copy = data.filter(elem => getDay(elem.date) === +selectedDay && getMonth(elem.date) === +selectedMonth && getYear(elem.date) === +selectedYear);
            setPurchases(copy);
            }
            
        } else {
            let copy = data.filter(elem => getDay(elem.date) === +selectedDay && getMonth(elem.date) === +selectedMonth && getYear(elem.date) === +selectedYear && selectedCategory === elem.kind);
            setPurchases(copy);
        }

        if(selectedDay !== day && selectedMonth === month && selectedYear === year) {
            setTime(`${selectedMonth}.${selectedYear}`);
        }  else {
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
                <Button id="btnToday" style={index === 'btnToday' ? {backgroundColor: bgCol} : {backgroundColor: ''}} onClick={handleToday}>{getTranslate(lang, messages.btnToday)}</Button>
                <Button id="btnMonth" style={index === 'btnMonth' ? {backgroundColor: bgCol} : {backgroundColor: ''}} onClick={handleMonth}>{getTranslate(lang, messages.btnMonth)}</Button>
                <Button id="btnYear" style={index === 'btnYear' ? {backgroundColor: bgCol} : {backgroundColor: ''}} onClick={handleYear}>{getTranslate(lang, messages.btnYear)}</Button>
                <Button id="btnAllTime" style={index === 'btnAllTime' ? {backgroundColor: bgCol} : {backgroundColor: ''}} onClick={handleAllTime}>{getTranslate(lang, messages.btnAllTime)}</Button>
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

            <Button id="btnSearch" style={index === 'btnSearch' ? {backgroundColor: bgCol} : {backgroundColor: ''}}  onClick={handleSearch}>{getTranslate(lang, messages.btnSearch)}</Button>
            
            <Result>
            {time} <br/> <b style={{width: '100px',
                                    margin: '0 auto',
                                    border: '1px solid black',
                                    borderRadius: '15px', 
                                    padding: '3px 8px',
                                    display: 'block',
                                    marginTop: '6px'}}>{getSum()}<span>&#8381;</span></b>
            </Result>

            <Table selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
              data={data} setData={setData} 
              purchases={purchases} 
              setPurchases={setPurchases}
              setTime={setTime}
              lang={lang}/>
        </div>
        
        
    )
};

export default Statistic;