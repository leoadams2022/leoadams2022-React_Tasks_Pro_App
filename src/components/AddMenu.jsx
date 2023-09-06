import React, { useRef, useState, useEffect } from 'react'
import { useLocalStorage } from '../components/LocalStorageContext';
import styles from './CSS/AddMenu.module.css'
export default function AddMenu({ closeAddTapFunc, activeAddCompo, groupId }) {
    const { data, saveToLocalStorage } = useLocalStorage();//
    const [myError, setMyError] = useState(false);
    const [selectedColor, setSelectedColor] = useState();
    // const selectedColor = useRef(null);
    let TasksObj = data[0].Tasks;
    let GroupsObj = data[1].Groups;
    const formRef = useRef(null);
    const titleRef = useRef(null);
    const colorRef = useRef(null);
    const handleAddMenu = (event, id = new Date().getTime()) => {
        event.preventDefault();
        const myForm = formRef.current;
        const data = new FormData(myForm);
        const formValues = {};
        for (let [name, value] of data) {
            formValues[name] = value;
        }
        // form validtion -----------
        // Menu title
        if ((formValues.title.length < 4) || (formValues.title.length > 16)) {
            setMyError('invalid menu title');
            return false;
        } else {
            setMyError(false)
        }
        // goure
        if (groupId === null) {
            const groupExists = GroupsObj.some(obj => obj.title === formValues.title.trim());
            if (groupExists) {
                setMyError('already exiscting menu');
                return false;
            } else {
                setMyError(false);
            }
        }
        // -----------//form validtion 
        if (groupId !== null) {
            let newData1 = GroupsObj.filter((task, i) => (task.id !== groupId));
            const newGroup = { id: id, title: formValues.title, color: formValues.color }
            let sorted = [...newData1, newGroup].sort((a, b) => a.id - b.id);
            let newData = [{ Tasks: TasksObj }, { Groups: sorted }];
            saveToLocalStorage(newData);
            closeAddTapFunc();
        } else {
            const newGroup = { id: id, title: formValues.title, color: formValues.color };
            let sorted = [...GroupsObj, newGroup].sort((a, b) => a.id - b.id);
            let newData = [{ Tasks: TasksObj }, { Groups: sorted }];
            saveToLocalStorage(newData);
            closeAddTapFunc();
        }

    }

    const handleUpdateTask = (e) => {
        handleAddMenu(e, groupId)
    }
    const handleCancelTask = (e) => {
        e.preventDefault()
        closeAddTapFunc()
    }
    const handelSelectColor = (color) => {
        setSelectedColor(color)
        colorRef.current.value = color
        // console.log(selectedColor)
    }
    let group = useRef(null);
    useEffect(() => {
        if (groupId !== null) {
            group.current = data[1].Groups.filter((group, i) => (group.id === groupId));
            const title = titleRef.current;
            const color = colorRef.current;
            title.value = group.current[0].title
            color.value = group.current[0].color
            // console.log(color)
            setSelectedColor((prevSelectedColor) => group.current[0].color || prevSelectedColor);
        } else {
            if (activeAddCompo === 'AddMenu') {
                const color = colorRef.current;
                color.value = '#6074F9';
                setSelectedColor('#6074F9');
            }
        }
    }, [data, groupId, setSelectedColor, activeAddCompo])

    if (activeAddCompo !== 'AddMenu') {
        return null
    }
    return (
        <div className={styles.container}>
            <div>
                <p className={styles.errorParagraph + ' ' + (myError !== false ? styles.errorParagraphVisibel : '')}>
                    {myError !== false ? myError : null}
                </p>
            </div>
            <form ref={formRef} action="" className={styles.AddTaskForm}>
                <label htmlFor="title" className={styles.labelTag}>Title:</label>
                <input ref={titleRef} type="text" id="title" name="title" className={styles.formInput} />
                <label htmlFor="" className={styles.labelTag}>Color:</label>
                <input ref={colorRef} type="color" name="color" id="color" className={styles.formInput + ' ' + styles.colorInput} style={{ position: 'absolute', opacity: '0', left: '-9999px', pointerEvents: 'none', zIndex: '-100' }} />
                <div className={styles.colorPickerDiv}>
                    <div onClick={() => { handelSelectColor('#6074F9') }}>

                        <div className={styles.colorDiv + ' ' + (selectedColor === '#6074F9' || selectedColor === '#6074f9' ? styles.selected : '')}
                            style={{
                                background: '#6074F9'
                            }}
                        ></div>
                    </div>
                    <div onClick={() => { handelSelectColor('#E42B6A') }}>

                        <div className={styles.colorDiv + ' ' + (selectedColor === '#E42B6A' || selectedColor === '#e42b6a' ? styles.selected : '')}
                            style={{
                                background: '#E42B6A'
                            }}
                        ></div>
                    </div>
                    <div onClick={() => { handelSelectColor('#5ABB56') }}>

                        <div className={styles.colorDiv + ' ' + (selectedColor === '#5ABB56' || selectedColor === '#5abb56' ? styles.selected : '')}
                            style={{
                                background: '#5ABB56'
                            }}
                        ></div>
                    </div>
                    <div onClick={() => { handelSelectColor('#3D3A62') }}>

                        <div className={styles.colorDiv + ' ' + (selectedColor === '#3D3A62' || selectedColor === '#3d3a62' ? styles.selected : '')}
                            style={{
                                background: '#3D3A62'
                            }}
                        ></div>
                    </div>
                    <div onClick={() => { handelSelectColor('#F4CA8F') }}>

                        <div className={styles.colorDiv + ' ' + (selectedColor === '#F4CA8F' || selectedColor === '#f5ca8f' ? styles.selected : '')}
                            style={{
                                background: '#F4CA8F'
                            }}
                        ></div>
                    </div>
                </div>

                {
                    groupId === null ?
                        (
                            <button onClick={handleAddMenu} className={styles.submitInput}>Add</button>
                        )
                        :
                        (
                            <>
                                <button onClick={handleUpdateTask} className={styles.formInput + ' ' + styles.updateInput}>Update</button>
                                <button onClick={handleCancelTask} className={styles.formInput + ' ' + styles.cancelInput}>Cancel</button>
                            </>
                        )
                }
            </form>
        </div>

    )
}
