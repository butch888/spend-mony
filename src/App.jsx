import React, {useEffect, useState} from 'react';
import Categories from './Components/Categories/Categories';
import Statistic from './Components/Statistic/Statistic';
import EditCategory from './Components/EditCategory/EditCategory'
import { Routes, Route, NavLink } from 'react-router-dom';
import { Wrapper, Container, Title } from './AppStyle';
import './App.css'
import { date } from './date';
import { arrCategories } from './data';
import { getTranslate, messages } from './messages';
import { useQuerySpending } from './hooks/useQuerySpending';

function App() {

  const {data} = useQuerySpending();
  console.log(data);
 
  let spends = localStorage.getItem('spends');

  if(spends === null) {
    localStorage.setItem('spends', JSON.stringify([]));
  }
  let strFromStorage = localStorage.getItem('spends');
  let shoppings = JSON.parse(strFromStorage);

  const shoppingsToday = shoppings.filter(elem => elem.date === date); // показывает только сегодняшние записи

  let day = new Date().getDate();
    let month = new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    if (month === 9) {
        month = 10;
    }
    if (month > 0 && month < 10) {
        month = '0' + (month);
    } 

  const [data1, setData] = useState(shoppings);
  const [purchases, setPurchases] = useState([]);
  const [time, setTime] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Категории');
  const [activAlert, setActiveAlert] = useState(false);
  const [text, setText] = useState('');
  const [selectedDay, setSelectedDay] = useState(day);
  const [selectedMonth, setSelectedMonth] = useState(month);
  const [selectedYear, setSelectedYear] = useState(year);
  const [isMonth, setIsMonth] = useState(false);
  const [categories, setCategories] = useState(arrCategories);
  const [lang, setLang] = useState('ru');
  const [index , setIndex] = useState('btnToday');
    
  useEffect(() => {
    if (selectedCategory === getTranslate(lang, messages.category) && index === "btnToday") {
      setPurchases(shoppingsToday);
      setTime(getTranslate(lang, messages.period) + selectedCategory.toLowerCase() + getTranslate(lang, messages.today));


    } else if (selectedCategory === getTranslate(lang, messages.category) && index === "btnMonth") {
      const filteretData = data1.filter(elem => getMonth(elem.date) === new Date().getMonth() + 1 && getYear(elem.date) === new Date().getFullYear());
      setPurchases(filteretData);
      setTime(getTranslate(lang, messages.period) + selectedCategory.toLowerCase() + getTranslate(lang, messages.month));


    } else if (selectedCategory === getTranslate(lang, messages.category) && index === "btnYear") {
      const filteretData = data1.filter(elem => getYear(elem.date) === new Date().getFullYear());
      setPurchases(filteretData);
      setTime(getTranslate(lang, messages.period) + selectedCategory.toLowerCase() + getTranslate(lang, messages.year));
    

    } else if (selectedCategory === getTranslate(lang, messages.category) && index === "btnAllTime") {
      setPurchases(data1);
      setTime(getTranslate(lang, messages.period) + selectedCategory.toLowerCase() + getTranslate(lang, messages.allTime));


    } else if (index === "btnToday") {
      const filteretData = data1.filter(elem => elem.kind === selectedCategory && elem.date === date )
      setPurchases(filteretData);
      setTime(getTranslate(lang, messages.nowCategory) + `"${selectedCategory}"` + getTranslate(lang, messages.today));


    } else if (index === "btnMonth") {
      const filteretData = data1.filter(elem => getMonth(elem.date) === new Date().getMonth() + 1 && elem.kind === selectedCategory && getYear(elem.date) === new Date().getFullYear());
      setPurchases(filteretData);
      setTime(getTranslate(lang, messages.nowCategory) + `"${selectedCategory}"` + getTranslate(lang, messages.month));


    } else if (index === "btnYear") {
      const filteretData = data1.filter(elem => getYear(elem.date) === new Date().getFullYear() && elem.kind === selectedCategory);
      setPurchases(filteretData);
      setTime(getTranslate(lang, messages.nowCategory) + `"${selectedCategory}"` + getTranslate(lang, messages.year));


    } else if (index === "btnAllTime") {
      const filteretData = data1.filter(elem => elem.kind === selectedCategory);
      setPurchases(filteretData);
      setTime(getTranslate(lang, messages.nowCategory) + `"${selectedCategory}"` + getTranslate(lang, messages.allTime));
    }
  },[data1, selectedCategory, lang]);

  function getDay(str) {
    const dotIndex = str.indexOf('.');
    const numberStr = str.slice(0, dotIndex);
    const number = Number(numberStr);
    return number;
  }

  function getMonth(str) {
    str = str.slice(3);
    const dotIndex = str.indexOf('.');
    const numberStr = str.slice(0, dotIndex);
    const number = Number(numberStr);
    return number;
  }

  function getYear(str) {
    str = str.slice(6);
    const year = Number(str);
    return year;
  }

  const onClose = () => {
    setActiveAlert(false)
  };
  
  function handleRus() {
    setLang('ru');
    setSelectedCategory('Категории');
    setIndex('btnToday')
  }

  function handleEng() {
    setLang('en');
    setSelectedCategory('Categories');
    setIndex('btnToday')
  }

  return (
    <Wrapper>
      <Container>
        <Title>{getTranslate(lang, messages.appTitle)}</Title>

        <div className='lang'>
          <span className='rus' style={lang === 'ru' ? {fontWeight: 700} : {fontWeight: 400}} onClick={handleRus}>ru</span> | 
          <span className='eng' style={lang === 'en' ? {fontWeight: 700} : {fontWeight: 400}} onClick={handleEng}> en</span>
        </div>
        
        <nav>
          <NavLink to={"/"}>{getTranslate(lang, messages.appNavSpend)}</NavLink>
          <NavLink to={"/statistics"}>{getTranslate(lang, messages.appNavStatistic)}</NavLink>
          <NavLink to={"/categories"}>{getTranslate(lang, messages.appNavCategory)}</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<Categories data={data1} 
                  setData={setData} 
                  setPurchases={setPurchases}
                  purchases={purchases}
                  selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                  time={time} setTime={setTime}
                  onClose={onClose}
                  setText={setText}
                  text={text}
                  setActiveAlert={setActiveAlert}
                  activAlert={activAlert}
                  categories={categories} setCategories={setCategories}
                  lang={lang} 
                  setIndex={setIndex} />}>

          </Route>
          <Route path="/statistics" element={<Statistic data={data1} 
                  setData={setData} 
                  purchases={purchases} 
                  setPurchases={setPurchases}
                  selectedCategory={selectedCategory}
                  time={time}
                  setTime={setTime}
                  setActiveAlert={setActiveAlert}
                  activAlert={activAlert}
                  setText={setText}
                  text={text}
                  onClose={onClose}
                  selectedDay={selectedDay} 
                  setSelectedDay={setSelectedDay}
                  selectedMonth={selectedMonth} 
                  setSelectedMonth={setSelectedMonth}
                  selectedYear={selectedYear} 
                  setSelectedYear={setSelectedYear}
                  getDay={getDay}
                  getMonth={getMonth}
                  getYear={getYear}
                  isMonth={isMonth} 
                  setIsMonth={setIsMonth}
                  setSelectedCategory={setSelectedCategory}
                  categories={categories} setCategories={setCategories}
                  lang={lang}
                  index={index} setIndex={setIndex} />}>
          </Route>
          <Route path="/categories" element={<EditCategory data={data1} 
                  setData={setData} 
                  setPurchases={setPurchases}
                  purchases={purchases}
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory}
                  time={time}
                  setTime={setTime}
                  onClose={onClose}
                  setText={setText}
                  text={text}
                  setActiveAlert={setActiveAlert}
                  activAlert={activAlert}
                  categories={categories} setCategories={setCategories}
                  lang={lang} />}>

          </Route>
        </Routes>
              
      </Container>
    </Wrapper>
  );
}

export default App;
