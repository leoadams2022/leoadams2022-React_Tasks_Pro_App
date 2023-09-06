import './App.css';
import Landing from './components/Landing';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBottom from './components/NavBottom';
import Menu from './Pages/Menu';
import Header from './components/Header';
import MyTasks from './Pages/MyTasks'
import Profile from './Pages/Profile';
import Quick from './Pages/Quick';
import NewTask from './components/NewTask';

import { LocalStorageProvider } from './components/LocalStorageContext';

function App() {
  const [hideLanding, setHideLanding] = useState(1);
  const [hideAddTask, setHideAddTask] = useState(1);
  const [dayOrMonth, setDayOrMonth] = useState('Today');
  const [filterType, setFilterType] = useState('All Tasks');
  const [darkModeActive, setDarkModeActive] = useState(false);

  const handleDayOrMonth = (op) => {
    setDayOrMonth(op)
  }
  const handleFilterType = (op) => {
    setFilterType(op)
  }
  const handleShowLanding = () => {
    const cookieName = "HideLanding";
    const cookieValue = "true";
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30); // it will show up agein in 30 days
    document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}`;
    setHideLanding(1)
  }
  useEffect(() => {
    const cookieName = "HideLanding";
    const cookies = document.cookie.split(";").map(cookie => cookie.trim());
    const cookie = cookies.find(cookie => cookie.startsWith(`${cookieName}=`));
    if (cookie) {
      const cookieValue = cookie.split("=")[1];
      if (cookieValue === 'true')
        setHideLanding(1)
    } else {
      setHideLanding(0)
    }


    const cookieName_2 = "DarkMode";
    const cookies_2 = document.cookie.split(";").map(cookie => cookie.trim());
    const cookie_2 = cookies_2.find(cookie => cookie.startsWith(`${cookieName_2}=`));
    if (cookie_2) {
      const cookieValue = cookie_2.split("=")[1];
      if (cookieValue === 'true')
        setDarkModeActive(true)
    } else {
      setDarkModeActive(false)
    }
  }, [setHideLanding, setDarkModeActive])

  return (
    <>
      <LocalStorageProvider>

        <div className={'appWarper' + (darkModeActive ? ' darkMode' : '')}>
          <Landing Hide={hideLanding} onClick={() => { handleShowLanding() }} />

          <Router>

            <Header onTabClick={handleDayOrMonth} onFilterClick={handleFilterType} />

            <NewTask
              todayOrMonth={dayOrMonth}
              filterType={filterType}
              Hide={hideAddTask}
              closeAddFunc={() => {
                setHideAddTask(!hideAddTask);
              }}
            />

            <Routes>
              <Route exact path="/" element={<MyTasks todayOrMonth={dayOrMonth} filterType={filterType} />} />
              <Route path="/Menu" element={<Menu todayOrMonth={dayOrMonth} filterType={filterType} />} />
              <Route path="/MyTasks" element={<MyTasks todayOrMonth={dayOrMonth} filterType={filterType} />} />
              <Route path="/Profile" element={<Profile darkModeActive={darkModeActive} setDarkModeActive={(op) => { setDarkModeActive(op) }} />} />
              <Route path="/Quick" element={<Quick todayOrMonth={dayOrMonth} filterType={filterType} />} />
            </Routes>

            <NavBottom Hide={!hideLanding} closeAddFunc={() => { setHideAddTask(!hideAddTask) }} />

          </Router>

        </div>

      </LocalStorageProvider>
    </>
  );
}

export default App;
