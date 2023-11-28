import React, {useEffect, useState} from 'react';
import Categories from './Components/Categories/Categories';
import Table from './Components/Table/Table';
import Statistic from './Components/Statistic/Statistic';
import { Wrapper, Container, Title } from './AppStyle';
import './App.css'
import { date } from './date';

function App() {
  
  let spends = localStorage.getItem('spends');

  if(spends === null) {
    localStorage.setItem('spends', JSON.stringify([]));
  }
  let strFromStorage = localStorage.getItem('spends');
  let shoppings = JSON.parse(strFromStorage);

  const shoppingsToday = shoppings.filter(elem => elem.date === date); // показывает только сегодняшние записи

  const [data, setData] = useState(shoppings);
  const [purchases, setPurchases] = useState([]);
  const [time, setTime] = useState('Все категории за все время:');
  const [selectedCategory, setSelectedCategory] = useState('Категории');
  const [activAlert, setActiveAlert] = useState(false);
  const [text, setText] = useState('');
  const [selectedDay, setSelectedDay] = useState('День');
  const [selectedMonth, setSelectedMonth] = useState('Месяц');
  const [selectedYear, setSelectedYear] = useState('Год');
  const [isMonth, setIsMonth] = useState(false);

  useEffect(() => {
    if (selectedCategory === 'Категории') {
      setPurchases(shoppingsToday);
      setTime(`Все ${selectedCategory.toLowerCase()} за все сегодня:`);
    } else {
      const filteretData = data.filter(elem => elem.kind === selectedCategory)
      setPurchases(filteretData);
      setTime(`Категория "${selectedCategory}" за все время:`);
    }
  },[data, selectedCategory]);

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


  return (
    <Wrapper>
      <Container>
        <Title>Жу<span>&#8381;</span>нал уч<span>&#8364;</span>та <span>&#8381;</span>а$ходов</Title>
        <Categories data={data} 
                  setData={setData} 
                  setPurchases={setPurchases} 
                  selectedCategory={selectedCategory} 
                  setSelectedCategory={setSelectedCategory}
                  time={time}
                  setTime={setTime}
                  onClose={onClose}
                  setText={setText}
                  text={text}
                  setActiveAlert={setActiveAlert}
                  activAlert={activAlert}/>

       <Statistic data={data} 
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
                  setIsMonth={setIsMonth}/>

        <Table selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
              data={data} setData={setData} 
              purchases={purchases} 
              setPurchases={setPurchases}
              setTime={setTime}/>
              
        </Container>
    </Wrapper>
  );
}

export default App;
