import React, { useState, useEffect } from 'react'
import styles from '../components/CSS/QuickTask.module.css';
import { useLocalStorage } from './LocalStorageContext';
import editIcon from '../assets/photos/editIcon.svg'
import deleteIcon from '../assets/photos/deleteIcon.svg'
export default function QuickRow({ taskId, taskTitle, teskGroup, openEdit, showOp, switchOp }) {
    const { data, saveToLocalStorage } = useLocalStorage();
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
    const get50PercentTransparent = (color) => {
        // Convert hexadecimal color to RGB values
        const r = parseInt(color.substring(1, 3), 16);
        const g = parseInt(color.substring(3, 5), 16);
        const b = parseInt(color.substring(5, 7), 16);

        // Set the opacity to 0.5 (50% transparency)
        const alpha = 0.3;

        // Return the RGBA representation
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    const handelDelete = (taskId) => {
        let newData = data[0].Tasks.filter((task, i) => (task.id !== taskId));
        saveToLocalStorage([{ Tasks: newData }, { Groups: data[1].Groups }]);
    }
    const handelEdit = () => {
        openEdit()
    }
    useEffect(() => {
        setOptionsOpened(showOp)
        // console.log('showOp form QuickRow : ', showOp)
    }, [setOptionsOpened, showOp])
    return (
        <div className={styles.quickTaskDiv} onClick={(e) => { e.stopPropagation(); openOption() }}>
            <div className={styles.quickTaskColorDiv} style={{
                background: getGroupColor(teskGroup)
            }}></div>
            <p className={styles.quickTaskP}>{taskTitle}</p>
            <div className={styles.optionsDiv + ' ' + (optionsOpened === taskId ? styles.showOp : '')} style={{
                background: `radial-gradient(${get50PercentTransparent(getGroupColor(teskGroup))}, #00000008)`
            }}>
                <div className={styles.optionDiv + ' ' + (optionsOpened === taskId ? styles.showOp : '')} onClick={(e) => { e.stopPropagation(); handelEdit(taskId) }}>
                    <img src={'.' + editIcon} alt="" />
                </div>
                <div className={styles.optionDiv + ' ' + (optionsOpened === taskId ? styles.showOp : '')} onClick={(e) => { e.stopPropagation(); handelDelete(taskId) }} >
                    <img src={'.' + deleteIcon} alt="" />
                </div>
            </div>
        </div>
    )
}
