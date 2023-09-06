import React, { useEffect, useRef, useState } from 'react'
import { useLocalStorage } from '../components/LocalStorageContext';
import styles from './CSS/AddQuick.module.css'
export default function AddQuick({ closeAddTapFunc, activeAddCompo, taskId }) {
    const { data, saveToLocalStorage } = useLocalStorage();//
    const [myError, setMyError] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState();
    let TasksObj = data[0].Tasks;
    let GroupsObj = data[1].Groups;
    const formRef = useRef(null);
    const titleRef = useRef(null);
    const groupRef = useRef(null);
    const handleAddTask = (event, id = new Date().getTime()) => {
        event.preventDefault();
        const myForm = formRef.current;
        const data = new FormData(myForm);
        const formValues = {};
        for (let [name, value] of data) {
            formValues[name] = value;
        }
        // form validtion -----------
        // task title
        if (formValues.title.length < 4) {
            setMyError('invalid task title');
            return false;
        } else {
            setMyError(false)
        }

        // group
        const groupExists = GroupsObj.some(obj => obj.title === formValues.group);
        if (!groupExists) {
            setMyError('invalid group');
            return false;
        } else {
            setMyError(false);
        }
        // -----------//form validtion 
        if (taskId !== null) {
            let newData1 = TasksObj.filter((task, i) => (task.id !== taskId));
            const newTask = { id: id, title: formValues.title, timeStamp: task.current[0].id, group: formValues.group, checked: null, type: 'quick' };
            let sorted = [...newData1, newTask].sort((a, b) => a.timeStamp - b.timeStamp);
            let newData = [{ Tasks: sorted }, { Groups: GroupsObj }];
            saveToLocalStorage(newData);
            closeAddTapFunc();
        } else {
            const newTask = { id: id, title: formValues.title, timeStamp: id, group: formValues.group, checked: null, type: 'quick' };
            let sorted = [...TasksObj, newTask].sort((a, b) => a.timeStamp - b.timeStamp);
            let newData = [{ Tasks: sorted }, { Groups: GroupsObj }];
            saveToLocalStorage(newData);
            closeAddTapFunc();
        }
    }
    const handleUpdateTask = (e) => {
        handleAddTask(e, taskId)
    }
    const handleCancelTask = (e) => {
        e.preventDefault()
        closeAddTapFunc()
    }
    const handelSelectColor = (group) => {
        setSelectedGroup(group)
        for (let i = 0; i < groupRef.current.length; i++) { if (groupRef.current[i].value === group) { groupRef.current[i].selected = true } }
        // console.log(groupRef.current.value)
    }
    let task = useRef(null);
    useEffect(() => {
        if (taskId !== null) {
            task.current = data[0].Tasks.filter((task, i) => (task.id === taskId));
            const title = titleRef.current;
            const group = groupRef.current;
            title.value = task.current[0].title
            for (let i = 0; i < group.length; i++) { if (group[i].value === task.current[0].group) { group[i].selected = true } }
            // console.log(task, taskId)
            setSelectedGroup((prev) => task.current[0].group || prev);
        }
    }, [data, taskId])
    if (activeAddCompo !== 'AddQuick') {
        return null
    }
    return (
        <div className={styles.container}>
            <div>
                <p className={styles.errorParagraph + ' ' + (myError !== false ? styles.errorParagraphVisibel : '')}>
                    {myError !== false ? myError : null}
                </p>
            </div>
            <form ref={formRef} className={styles.AddQuickForm}>
                <div className={styles.inputDiv}>
                    <label htmlFor="title" className={styles.labelTag + ' ' + styles.titleLabel}>Quick Note Text:</label>
                    <textarea ref={titleRef} type="text" name="title" id="title" className={styles.formInput + ' ' + styles.titleInput} style={{ resize: 'none', height: '10rem' }}></textarea>
                </div>
                <div className={styles.inputDiv}>
                    <label htmlFor="" className={styles.labelTag + ' ' + styles.menuLabel}>Category:</label>
                    <select ref={groupRef} name="group" id="group" className={styles.formInput + ' ' + styles.menuInput}
                        style={{ position: 'absolute', opacity: '0', left: '-9999px', pointerEvents: 'none', zIndex: '-100' }}>
                        <option value="null" className={styles.groupOption}>--</option>
                        {
                            GroupsObj.map((group, i) => {
                                return (
                                    <option key={i + '_' + group.title}
                                        className={styles.groupOption}
                                        value={group.title}
                                        style={{ background: group.color }}
                                    >
                                        {group.title}
                                    </option>
                                )
                            })
                        }
                    </select>
                    <div className={styles.groupPickerDiv}>
                        {
                            GroupsObj.map((group, i) => {
                                return (
                                    <div key={i + '_' + group.title}
                                        className={styles.groupOptionDiv + ' ' + (selectedGroup === group.title ? styles.selected : '')}
                                        onClick={() => { handelSelectColor(group.title) }}
                                        style={{ background: group.color }}
                                    >
                                        {group.title}
                                    </div>
                                )
                            })
                        }
                    </div>

                </div>
                <div className={styles.submitDiv}>
                    {
                        taskId === null ?
                            (
                                <button className={styles.formInput + ' ' + styles.submitInput} onClick={handleAddTask}>Add</button>
                            )
                            :
                            (
                                <>
                                    <button className={styles.formInput + ' ' + styles.updateInput} onClick={handleUpdateTask}>Update</button>
                                    <button className={styles.formInput + ' ' + styles.cancelInput} onClick={handleCancelTask}>Cancel</button>
                                </>
                            )
                    }
                </div>
            </form>
        </div>
    )
}
