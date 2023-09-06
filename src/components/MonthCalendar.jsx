import React, { useEffect, useRef, useState } from 'react'
import styles from './CSS/MonthCalendar.module.css'
import { useLocalStorage } from './LocalStorageContext';
import ArrowLeft from '../assets/photos/chevron_left.svg';
import ArrowRight from '../assets/photos/chevron_right.svg';
export default function MonthCalendar({ setDayDate }) {
    const { data } = useLocalStorage();//saveToLocalStorage
    const prevRef = useRef(Math.random().toString(36).substr(2, 9));
    const nextRef = useRef(Math.random().toString(36).substr(2, 9));
    const daysTag = useRef(Math.random().toString(36).substr(2, 9));
    const currentDate = useRef(Math.random().toString(36).substr(2, 9));
    let date = new Date();
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];
    const [liTag, setLiTag] = useState([]);
    let TasksObj = data[0].Tasks
    const renderCalendar = () => {
        setLiTag([])
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
            lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
        for (let i = firstDayofMonth; i > 0; i--) {
            let newDate = new Date(currYear, (currMonth - 1), (lastDateofLastMonth - i + 1))
            setLiTag((pre) => {
                return ([...pre, { liClass: styles.inactive, liValue: (lastDateofLastMonth - i + 1), liDate: newDate.getTime() }])
            })
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === date.getDate() && currMonth === new Date().getMonth()
                && currYear === new Date().getFullYear() ? styles.active : "";
            let newDate = new Date(currYear, currMonth, i)
            setLiTag((pre) => {
                return ([...pre, { liClass: isToday, liValue: i, liDate: newDate.getTime() }])
            })
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            let newDate = new Date(currYear, (currMonth + 1), (i - lastDayofMonth + 1))
            setLiTag((pre) => {
                return ([...pre, { liClass: styles.inactive, liValue: (i - lastDayofMonth + 1), liDate: newDate.getTime() }])
            })
        }
    }
    const handelPrevNext = (action) => {
        // console.log('currMonth before: ', currMonth);
        action === "prev" ? setCurrMonth((pre) => (pre - 1)) : setCurrMonth((pre) => (pre + 1));

    }
    const detectActiveTask = (timeStamp) => {
        for (let i = 0; i < TasksObj.length; i++) {
            if (TasksObj[i].type === 'normal') {
                let date1 = new Date(timeStamp)
                let date2 = new Date(TasksObj[i].timeStamp)
                let year1 = date1.getFullYear();
                let year2 = date2.getFullYear();
                let month1 = date1.getMonth();
                let month2 = date2.getMonth();
                let day1 = date1.getDate();
                let day2 = date2.getDate();
                if (
                    (year1 === year2) &&
                    (month1 === month2) &&
                    (day1 === day2)
                ) {
                    return true;
                    // eslint-disable-next-line
                    break;
                }
            }
        }
    }
    useEffect(() => {
        // console.log('currMonth after: ', currMonth);
        if (currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            // eslint-disable-next-line
            date = new Date(currYear, currMonth, new Date().getDate())
            setCurrYear(date.getFullYear()) // updating current year with new date year
            setCurrMonth(date.getMonth()) // updating current month with new date month
        } else {
            date = new Date();
        }
        renderCalendar();
    }, [currMonth, currYear])

    return (
        <>
            <div className={styles.wrapper}>
                <header>
                    <p className={styles.current_date} id={currentDate.current}>
                        {months[currMonth] + ' ' + currYear}
                    </p>
                    <div className={styles.icons}>
                        <span onClick={() => { handelPrevNext('prev') }} id={prevRef.current} className={styles.material_symbols_rounded}>
                            <img src={'.' + ArrowLeft} alt="" />
                        </span>
                        <span onClick={() => { handelPrevNext('next') }} id={nextRef.current} className={styles.material_symbols_rounded}>
                            <img src={'.' + ArrowRight} alt="" />
                        </span>
                    </div>
                </header>
                <div className={styles.calendar}>
                    <ul className={styles.weeks}>
                        <li>S</li>
                        <li>M</li>
                        <li>T</li>
                        <li>W</li>
                        <li>T</li>
                        <li>F</li>
                        <li>S</li>
                    </ul>
                    <ul className={styles.days} id={daysTag.current}>
                        {
                            liTag.map((li, i) => {
                                return (
                                    <li key={Math.random().toString(36).substr(2, 9)} className={li.liClass + ' ' + (detectActiveTask(li.liDate) === true ? styles.activeTask : '')}
                                        onClick={() => { setDayDate(li.liDate) }}
                                    >{li.liValue}</li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}
