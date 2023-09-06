import React, { useEffect, useState } from 'react'
import styles from '../components/CSS/Profile.module.css'
import { useLocalStorage } from '../components/LocalStorageContext';
import Slids from '../components/Slids';
import Model from '../components/Model';
export default function Profile({ setDarkModeActive, darkModeActive }) {
    const { data, saveToLocalStorage } = useLocalStorage();//saveToLocalStorage
    const [allTasksCount, setallTasksCount] = useState(0);
    const [completedTasksCount, setCompletedTasksCount] = useState(0);
    const [UncompletedTasksCount, setUncompletedTasksCount] = useState(0);

    const [uploadedDataStatus, setUploadedDataStatus] = useState(false)

    const [slidesArr, setSlidesArr] = useState([]);
    const [modalData, setModalData] = useState(null);
    const openModal = (txt, okayAction, cancelAction) => {
        setModalData({ txt, okayAction, cancelAction });
    };

    const closeModal = () => {
        setModalData(null);
    };
    const TasksObj = data[0].Tasks;
    const GroupsObj = data[1].Groups;

    const handelDeleteAll = () => {
        saveToLocalStorage([{ Tasks: [] }, { Groups: [{ id: 888, title: "General", color: "#6074F9" }] }])
    }
    const handelDeleteAllPast = () => {
        let newTasksObj = TasksObj.filter((task) => (task.type === 'normal' && new Date().getTime() < task.timeStamp))
        saveToLocalStorage([{ Tasks: newTasksObj }, { Groups: GroupsObj }])
    }
    const handelDeleteAllChecked = () => {
        let newTasksObj = TasksObj.filter((task) => (task.type === 'normal' && task.checked !== true))
        saveToLocalStorage([{ Tasks: newTasksObj }, { Groups: GroupsObj }])
    }

    const handelDarkMode = (e) => {
        const cookieName = "DarkMode";
        const cookieValue = e.target.checked;
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + 30); // it will show up agein in 30 days
        document.cookie = `${cookieName}=${cookieValue}; expires=${expirationDate.toUTCString()}`;
        if (e.target.checked) {
            setDarkModeActive(true)
        } else {
            setDarkModeActive(false)
        }
    }

    function downloadJSON(object, fileName) {
        const json = JSON.stringify(object);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();

        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const jsonData = JSON.parse(e.target.result);
                    if (validateJSONStructure(jsonData) === true) {
                        saveToLocalStorage(jsonData)
                        setUploadedDataStatus('Done');
                        setTimeout(() => {
                            setUploadedDataStatus(false)
                        }, 2000)
                        event.target.value = null;
                    } else {
                        // setUploadedData(`validateJSONStructure: ${validateJSONStructure(jsonData)}`);
                        setUploadedDataStatus(`You have provided and Unvalid data format`);
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    setUploadedDataStatus(false);
                }
            };
            reader.readAsText(file);
        }

    };
    function validateJSONStructure(data) {
        // console.log(data)
        if (!Array.isArray(data)) {
            return 'not an array';
        }

        if (!data[0].Tasks || !Array.isArray(data[0].Tasks)) {
            return 'Tasks is undefined or not an array';
        }
        if (!data[1].Groups || !Array.isArray(data[1].Groups)) {
            return 'Groups is undefined or not an array';
        }


        for (const task of data[0].Tasks) {
            if (
                typeof task.id !== 'number' ||
                typeof task.title !== 'string' ||
                typeof task.timeStamp !== 'number' ||
                typeof task.group !== 'string' ||
                (typeof task.checked !== 'boolean' && typeof task.checked !== 'object') ||
                !['normal', 'quick'].includes(task.type)
            ) {
                return 'at Tasks (id, title, timeStamp, group, checked) is wrong type';
            }
        }

        for (const group of data[1].Groups) {
            if (
                typeof group.id !== 'number' ||
                typeof group.title !== 'string' ||
                typeof group.color !== 'string'
            ) {
                return 'at Groups (id, title, color) is wrong type';
            }
        }

        return true;
    }

    useEffect(() => {
        const TasksObj = data[0].Tasks;
        const GroupsObj = data[1].Groups;
        let tempSlidesArr = []
        GroupsObj.forEach((group, i) => {

            let allTasksArr = TasksObj.map((task, i) => {
                if (task.type === 'normal' && task.group === group.title) {
                    return task
                }
                return undefined; // Return undefined for tasks that don't meet the conditions
            }).filter(task => task !== undefined);

            let allQuickTasksArr = TasksObj.map((task, i) => {
                if (task.type === 'quick' && task.group === group.title) {
                    return task
                }
                return undefined; // Return undefined for tasks that don't meet the conditions
            }).filter(task => task !== undefined);

            let newSlide = {
                title: '', ingUrl: null, text: '',
                innerText:
                    <div className={styles.countPergropuDiv} style={{ background: group.color }}>
                        <h3>
                            {group.title}
                        </h3>
                        <span>
                            {allTasksArr.length} Tasks
                        </span>
                        <span>
                            {allQuickTasksArr.length} Quick Tasks
                        </span>
                    </div>
                ,
            }
            tempSlidesArr.push(newSlide)
            // setSlidesArr((pre) => ([...pre, newSlide]))
        });
        setSlidesArr(tempSlidesArr)
    }, [data])
    useEffect(() => {
        // geting the tsaks count -----------
        let allTasksArr = TasksObj.map((task, i) => {
            if (task.type === 'normal') {
                return task
            }
            return undefined; // Return undefined for tasks that don't meet the conditions
        }).filter(task => task !== undefined); // Filter out undefined elements
        setallTasksCount(allTasksArr.length);

        let completedTasksArr = TasksObj.map((task, i) => {
            if (task.type === 'normal' && task.checked === true) {
                return task;
            }
            return undefined; // Return undefined for tasks that don't meet the conditions
        }).filter(task => task !== undefined); // Filter out undefined elements
        setCompletedTasksCount(completedTasksArr.length);

        let uncompletedTasksArr = TasksObj.map((task, i) => {
            if (task.type === 'normal' && task.checked === false) {
                return task;
            }
            return undefined; // Return undefined for tasks that don't meet the conditions
        }).filter(task => task !== undefined); // Filter out undefined elements
        setUncompletedTasksCount(uncompletedTasksArr.length);
        // ------------------------------------------------------------------ // geting the tsaks count 


    }, [TasksObj, GroupsObj, setallTasksCount, setCompletedTasksCount, setUncompletedTasksCount])
    return (
        <>
            <div className={styles.container}>

                <div className={styles.taskdsCountWarpper}>
                    <div className={styles.allTasks + ' ' + styles.countDiv}>
                        <h3>{allTasksCount}</h3>
                        <p>Task in Total</p>
                    </div>
                    <div className={styles.taskdsCountInnerWarpper}>
                        <div className={styles.DoneTasks + ' ' + styles.countDiv}>
                            <h3>{completedTasksCount}</h3>
                            <p>Completed Tasks</p>
                        </div>
                        <div className={styles.notDontTasks + ' ' + styles.countDiv}>
                            <h3>{UncompletedTasksCount}</h3>
                            <p>Uncompleted Tasks</p>
                        </div>
                    </div>
                </div>
                <div className={styles.secoundRow}>
                    <div className={styles.tasksCountPerGroupWarper}>
                        <Slids images={slidesArr}
                            autoSlide={false}
                            withTitle={false}
                            withText={false}
                            withBtns={true}
                            withDots={false}
                        ></Slids>
                    </div>
                    <div className={styles.iStilDontKnow}>
                        <ul className={styles.optionsUl}>
                            <li className={styles.optionsLi}>
                                {/* <span onClick={handelDeleteAll}>
                                    Reset All
                                </span> */}
                                <span onClick={() => {
                                    openModal(
                                        'Do you want Reset and delete all tasks groups and quick tasks ?',
                                        () => {
                                            // console.log('Deleting all tasks groups and quick tasks...');
                                            handelDeleteAll()
                                            closeModal();
                                        },
                                        closeModal
                                    )
                                }}>Reset All</span>
                            </li>
                            <li className={styles.optionsLi}>
                                {/* <span onClick={handelDeleteAllPast}>
                                    Delete past tasks only
                                </span> */}
                                <span onClick={() => {
                                    openModal(
                                        'Do you want Reset and delete all past tasks ?',
                                        () => {
                                            // console.log('Deleting all past tasks...');
                                            handelDeleteAllPast()
                                            closeModal();
                                        },
                                        closeModal
                                    )
                                }}>
                                    Delete past tasks only
                                </span>
                            </li>
                            <li className={styles.optionsLi}>
                                {/* <span onClick={handelDeleteAllChecked}> */}
                                <span onClick={() => {
                                    openModal(
                                        'Do you want Reset and delete all checked tasks ?',
                                        () => {
                                            // console.log('Deleting all checked tasks...');
                                            handelDeleteAllChecked()
                                            closeModal();
                                        },
                                        closeModal
                                    )
                                }}>
                                    Delete checked tasks only
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className={styles.statisticsWarper}>
                    <div className={styles.darkModeDiv}>
                        <span>Dark Mode :</span>
                        <label className={styles.switch}>
                            <input checked={darkModeActive} type="checkbox" onChange={handelDarkMode} className={styles.switchInput} />
                            <span className={styles.slider}></span>
                        </label>

                    </div>
                    <div className={styles.dataExportDiv}>
                        <p className={styles.title}>Export and Import your data:</p>
                        <button className={styles.downloadDataBtn} onClick={() => { downloadJSON(data, 'user_data.json') }}>Download your data</button>

                        <label className={styles.customFileInput}>
                            <span>
                                {uploadedDataStatus !== false ? uploadedDataStatus : 'Select a JSON File To Import'}
                            </span>
                            <input className={styles.fileInput} type="file" accept=".json" onChange={handleFileChange} />
                        </label>

                    </div>
                    {/* <button onClick={setDarkModeAcrive}>Dark Mode</button> */}
                    <span className={styles.CreditSpan}>
                        This was built using React by  Walid Ali.
                        I hope you like it and that it serves you well.
                    </span>
                    <span className={styles.creditLinks}>
                        <a href="mailto:walid.ali.ggg@gmail.com">Email Me</a>
                        <a href="tel:00201025984227">Call Me</a>
                    </span>
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
