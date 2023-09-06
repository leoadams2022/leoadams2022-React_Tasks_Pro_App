import React, { useEffect, useState } from 'react'
import styles from '../components/CSS/MyTasks.module.css' //'../CSS/MyTasks.module.css'
import TaskRow from '../components/TaskRow';
import { useLocalStorage } from '../components/LocalStorageContext';
import MonthCalendar from '../components/MonthCalendar';
import AddTask from '../components/AddTask'
export default function MyTasks({ todayOrMonth, filterType }) {
    const { data } = useLocalStorage();//saveToLocalStorage
    const [tasksFilter, setTasksFilter] = useState(filterType);
    const [dayDate, setDayDate] = useState(new Date().getTime());
    const [taskId, setTaskId] = useState(null);
    const [openEdit, setOpenEdit] = useState(0)
    const [showOp, setShowOp] = useState(0)
    useEffect(() => {
        setTasksFilter(filterType)
        todayOrMonth === 'Today' && setDayDate(new Date().getTime());
        setShowOp(null)
    }, [filterType, todayOrMonth])

    const GetDate = () => {
        const monthsShort = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        const today = new Date();
        const day = today.getDate(); // Get the day of the month (1-31)
        const month = today.getMonth(); // Get the month (0-11, where 0 is January and 11 is December)
        const year = today.getFullYear(); // Get the year (e.g., 2023)
        const otherDaydate = new Date(dayDate);
        const OtherDay = otherDaydate.getDate(); // Get the day of the month (1-31)
        const OtherMonth = otherDaydate.getMonth(); // Get the month (0-11, where 0 is January and 11 is December)
        const OtherYear = otherDaydate.getFullYear(); // Get the year (e.g., 2023)
        return (`${(day === OtherDay && month === OtherMonth && year === OtherYear) ? 'Today,' : 'Day:'} ${monthsShort[OtherMonth]} ${OtherDay}/${OtherYear}`)
    };
    let TasksObj = data[0].Tasks
    return (
        <div className={styles.outerWarper} onClick={() => { setShowOp(null) }}>
            <div className={styles.allTasksRows}>
                {
                    todayOrMonth === 'Today' ? (
                        <>
                            <p className={styles.todayDateP}><span>{GetDate()}</span></p>
                            {
                                TasksObj.filter((task) => {
                                    if (task.type === 'normal') {
                                        if (
                                            new Date(dayDate).getDate() === new Date(task.timeStamp).getDate() &&
                                            new Date(dayDate).getMonth() === new Date(task.timeStamp).getMonth() &&
                                            new Date(dayDate).getFullYear() === new Date(task.timeStamp).getFullYear()
                                        ) {

                                            if (tasksFilter === 'Incomplete Tasks') {
                                                if (task.checked === false) {
                                                    return task; // Filter tasks where taskChecked is false
                                                }
                                            } else if (tasksFilter === 'Completed Tasks') {
                                                if (task.checked === true) {
                                                    return task; // Filter tasks where taskChecked is true
                                                }
                                            } else if (tasksFilter === 'All Tasks') {
                                                return task; // Return all tasks without filtering
                                            }
                                        }
                                    }
                                    return null;
                                }).map((task, i) => (
                                    <TaskRow
                                        key={i + Math.random().toString(36).substr(2, 9)}
                                        taskTitle={task.title}
                                        taskTimeStamp={task.timeStamp}
                                        taskChecked={task.checked}
                                        teskColor={task.group}
                                        taskId={task.id}
                                        openEdit={() => { setTaskId(task.id); setOpenEdit((pre) => (!pre)) }}
                                        switchOp={() => { setShowOp((pre) => (pre === task.id ? null : task.id)) }}
                                        showOp={showOp}
                                    />
                                ))
                            }
                        </>
                    ) : (
                        <>
                            <MonthCalendar setDayDate={setDayDate} />
                            <p className={styles.todayDateP}><span>{GetDate()}</span></p>
                            {
                                TasksObj.filter((task) => {
                                    if (task.type === 'normal') {
                                        if (
                                            new Date(dayDate).getDate() === new Date(task.timeStamp).getDate() &&
                                            new Date(dayDate).getMonth() === new Date(task.timeStamp).getMonth() &&
                                            new Date(dayDate).getFullYear() === new Date(task.timeStamp).getFullYear()
                                        ) {

                                            if (tasksFilter === 'Incomplete Tasks') {
                                                if (task.checked === false) {
                                                    return task; // Filter tasks where taskChecked is false
                                                }
                                            } else if (tasksFilter === 'Completed Tasks') {
                                                if (task.checked === true) {
                                                    return task; // Filter tasks where taskChecked is true
                                                }
                                            } else if (tasksFilter === 'All Tasks') {
                                                return task; // Return all tasks without filtering
                                            }
                                        }
                                    }
                                    return null
                                }).map((task, i) => (
                                    <TaskRow
                                        key={i + Math.random().toString(36).substr(2, 9)}
                                        taskTitle={task.title}
                                        taskTimeStamp={task.timeStamp}
                                        taskChecked={task.checked}
                                        teskColor={task.group}
                                        taskId={task.id}
                                        openEdit={() => { setTaskId(task.id); setOpenEdit((pre) => (!pre)) }}
                                        switchOp={() => { setShowOp((pre) => (pre === task.id ? null : task.id)) }}
                                        showOp={showOp}
                                    />
                                ))
                            }
                        </>
                    )
                }

                {
                    openEdit === true ?
                        (<div className={styles.editContaineer} onClick={() => { setOpenEdit((pre) => (!pre)); setShowOp(null) }}>
                            <div className={styles.editInnerContaineer} onClick={(e) => { e.stopPropagation() }}>
                                <AddTask
                                    taskId={taskId}
                                    activeAddCompo={'AddTask'}
                                    closeAddTapFunc={() => { setOpenEdit((pre) => (!pre)); setShowOp(null) }} />
                            </div>
                        </div>) :
                        (null)
                }
            </div>
        </div>
    )
}
