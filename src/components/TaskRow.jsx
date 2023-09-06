import React, { useEffect, useRef, useState } from 'react'
import styles from './CSS/TaskRow.module.css'
import editIcon from '../assets/photos/editIcon.svg'
import deleteIcon from '../assets/photos/deleteIcon.svg'
import { useLocalStorage } from './LocalStorageContext';
export default function TaskRow({ taskTitle, taskTimeStamp, taskChecked, teskColor, taskId, openEdit, showOp, switchOp }) {
    const { data, saveToLocalStorage } = useLocalStorage();
    const myCheckbox = useRef(Math.random().toString(36).substr(2, 9));
    const [isDone, setIsDone] = useState(taskChecked);
    const [optionsOpened, setOptionsOpened] = useState(0)
    // const handleClick = () => { setOptionsOpened((pre) => (!pre)) }
    const openOption = () => {
        switchOp()
    }
    const GroupsObj = data[1].Groups;
    const getGroupColor = (group) => {
        for (let i = 0; i < GroupsObj.length; i++) {
            if (group === GroupsObj[i].title) {
                return GroupsObj[i].color;
                // eslint-disable-next-line
                break;
            }
        }
    }
    const handelCheckBoxChange = (taskId) => {
        setIsDone((pre) => (!pre));
        // console.log(taskId)
        let newData = data[0].Tasks.map((task, i) => {
            if (task.id === taskId) {
                return { ...task, checked: !task.checked }
            }
            return task;
        })
        saveToLocalStorage([{ Tasks: newData }, { Groups: data[1].Groups }]);
    }
    const handelDelete = (taskId) => {
        let newData = data[0].Tasks.filter((task, i) => (task.id !== taskId));
        saveToLocalStorage([{ Tasks: newData }, { Groups: data[1].Groups }]);
    }
    const formatUnixTimestamp = (timestamp, type = 'time') => {
        const dateObj = new Date(Number(timestamp));
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is zero-based
        const day = String(dateObj.getDate()).padStart(2, '0');
        const hours = dateObj.getHours();
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        // const seconds = String(dateObj.getSeconds()).padStart(2, '0');
        let period = 'AM';
        let formattedHours = hours;
        if (hours >= 12) {
            period = 'PM';
            formattedHours = hours === 12 ? 12 : hours - 12;
        }

        // Format the time string as 'hh:mm AM/PM'
        const formattedTime = `${formattedHours}:${minutes} ${period}`;//:${seconds}
        // Format the date string as you desire, for example:
        // 'YYYY-MM-DD HH:mm:ss'
        const formattedDate = `${year}-${month}-${day}`;// ${hours}:${minutes}:${seconds}

        return type === 'time' ? formattedTime : formattedDate;
    }
    const handelEdit = () => {
        openEdit()
    }
    useEffect(() => {
        setOptionsOpened(showOp)
    }, [setOptionsOpened, showOp])
    return (
        <div className={styles.outerWarper + ' ' + (optionsOpened === taskId ? styles.showOp : '')} onClick={(e) => { e.stopPropagation() }}>
            <div className={styles.TaskRowCont}>
                <div style={{ marginLeft: '0.5rem' }}>
                    <input type="checkbox" className={styles.checkBox} id={myCheckbox.current} checked={isDone ? 'checked' : ''} onChange={() => {
                        handelCheckBoxChange(taskId)
                    }} />
                    <label htmlFor={myCheckbox.current}></label>
                </div>
                <div className={styles.taskText} onClick={openOption}>
                    <p className={styles.taskTitle + ' ' + (isDone ? styles.disapled : '')}>{taskTitle}</p>
                    <p className={styles.taskTime}>{formatUnixTimestamp(taskTimeStamp, 'time')}</p>
                </div>
                <div className={styles.taskColorDiv} style={{ background: getGroupColor(teskColor) }} ></div>
            </div>
            <div className={styles.editDiv + ' ' + (optionsOpened === taskId ? ' ' : styles.dNone)}>
                <img src={'.' + editIcon} alt="" onClick={() => { handelEdit() }} />
            </div>
            <div className={styles.deleteDiv + ' ' + (optionsOpened === taskId ? ' ' : styles.dNone)}>
                <img src={'.' + deleteIcon} alt="" onClick={() => { handelDelete(taskId) }} />
            </div>
        </div>
    )
}
