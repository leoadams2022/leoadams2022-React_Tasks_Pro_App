import React, { useState } from 'react'
import { useLocalStorage } from '../components/LocalStorageContext';
import styles from '../components/CSS/Quick.module.css';
import QuickRow from '../components/QuickRow'
import AddQuick from '../components/AddQuick'

export default function Quick({ todayOrMonth, filterType }) {
    const { data, } = useLocalStorage();
    const [taskId, setTaskId] = useState(null);
    const [openEdit, setOpenEdit] = useState(0);
    const [showOp, setShowOp] = useState(0)
    let TasksObj = data[0].Tasks
    return (
        <>
            <div className={styles.quickWarpper} onClick={() => { setShowOp(null) }}>
                {
                    TasksObj.filter((task) => {
                        if (task.type === 'quick') return task;
                        return null
                    }).map((task, i) => (
                        <QuickRow
                            key={i + Math.random().toString(36).substr(2, 9)}
                            taskTitle={task.title}
                            teskGroup={task.group}
                            taskId={task.id}
                            openEdit={() => { setTaskId(task.id); setOpenEdit((pre) => (!pre)) }}
                            switchOp={() => { setShowOp((pre) => (pre === task.id ? null : task.id)) }}
                            showOp={showOp}
                        />
                    ))
                }

                {
                    openEdit === true ?
                        (<div className={styles.editContaineer} onClick={() => { setOpenEdit((pre) => (!pre)); setShowOp(null) }}>
                            <div className={styles.editInnerContaineer} onClick={(e) => { e.stopPropagation() }}>
                                <AddQuick
                                    taskId={taskId}
                                    activeAddCompo={'AddQuick'}
                                    closeAddTapFunc={() => { setOpenEdit((pre) => (!pre)); setShowOp(null) }}
                                />
                            </div>
                        </div>) :
                        (null)
                }

            </div>
        </>
    )
}