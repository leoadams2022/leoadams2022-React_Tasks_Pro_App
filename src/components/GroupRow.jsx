import React, { useEffect, useState } from 'react'
import styles from './CSS/GroupRow.module.css'
import { useLocalStorage } from '../components/LocalStorageContext';

import editIcon from '../assets/photos/editIcon.svg'
import deleteIcon from '../assets/photos/deleteIcon.svg'
import Model from './Model';
// import checkedIcon from '../assets/photos/checkedIcon.png'
export default function GroupRow({ color, title, id, openEdit, showOp, switchOp }) {
    const { data, saveToLocalStorage } = useLocalStorage();
    const [optionsOpened, setOptionsOpened] = useState(0)
    const [modalData, setModalData] = useState(null);
    const openModal = (txt, okayAction, cancelAction) => {
        setModalData({ txt, okayAction, cancelAction });
    };

    const closeModal = () => {
        setModalData(null);
    };
    const TasksObj = data[0].Tasks;
    const GroupsObj = data[1].Groups;
    const getTasksCountPerGroup = (groupTitle) => {
        let count = 0;
        TasksObj.forEach((task, i) => {
            if (task.type === 'normal') {
                if (task.group === groupTitle) {
                    count = count + 1;
                }
            }
        });
        return count.toString();
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
    const handleCheckAll = () => {
        let newData = TasksObj.map((task, i) => {
            if (task.group === title && task.checked === false) {
                return { ...task, checked: true }
            }
            return task;
        })
        saveToLocalStorage([{ Tasks: newData }, { Groups: GroupsObj }]);
        switchOp()
    }
    const handelDelete = () => {
        let newGroupData = data[1].Groups.filter((Group, i) => (Group.id !== id));
        let newTaskData = TasksObj.filter((task, i) => (task.group !== title))
        saveToLocalStorage([{ Tasks: newTaskData }, { Groups: newGroupData }]);
    }
    const handelEdit = () => {
        openEdit()
    }
    const openOption = () => {
        switchOp()
    }
    useEffect(() => {
        setOptionsOpened(showOp)
    }, [setOptionsOpened, showOp])
    return (
        <>
            <div className={styles.groupDiv} onClick={(e) => { e.stopPropagation(); openOption() }}>
                <div className={styles.groupColorDiv} style={{
                    backgroundColor: color,
                    outline: `0.375rem solid ${get50PercentTransparent(color)}`
                }}></div>
                <p className={styles.groupTitle}>
                    {title}
                    <label className={styles.countLabel}>{getTasksCountPerGroup(title)}<span> Tasks</span></label>
                </p>
                <div className={styles.optionsWarper + ' ' + (optionsOpened === id ? styles.open : null)}
                    onClick={(e) => { e.stopPropagation() }}
                    style={{ background: get50PercentTransparent(color) }}>
                    <div style={id === 888 ? { display: 'none' } : null}>
                        <img onClick={() => {
                            openModal(
                                'Do you want delete this group and all of its tasks and quick tasks ?',
                                () => {
                                    console.log('Deleting group and all of its tasks and quick tasks...');
                                    handelDelete()
                                    closeModal();
                                },
                                closeModal
                            )
                        }} src={'.' + deleteIcon} alt="" title='Delete with all of its tasks ' />
                    </div>
                    <div style={id === 888 ? { display: 'none' } : null}>
                        <img onClick={handelEdit} src={'.' + editIcon} alt="" title='Edit' /></div>
                    <div>
                        <span onClick={() => {
                            openModal(
                                'Do you want to check all tasks and quick tasks of this group ?',
                                () => {
                                    console.log('Checking all tasks and quick tasks of this group...');
                                    handleCheckAll()
                                    closeModal();
                                },
                                closeModal
                            )
                        }} className={styles.checkedIcon} title='Check all of its tasks'></span>
                    </div>
                </div>
            </div>
            {modalData && (
                <Model
                    txt={modalData.txt}
                    okayAction={modalData.okayAction}
                    cancelAction={modalData.cancelAction}
                />
            )}
        </>
    )
}
