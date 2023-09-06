import React, { useEffect, useState } from 'react'
import Styles from './CSS/NewTask.module.css'
import AddTask from './AddTask';
import AddQuick from './AddQuick';
import AddMenu from './AddMenu';
export default function NewTask({ todayOrMonth, filterType, Hide, closeAddFunc }) {
    const [activeAddCompo, setActiveAddCompo] = useState(null);
    const [hide, setHide] = useState(Hide)
    const setHideAndhideAddTask = () => {
        closeAddFunc()
        setHide(!hide)
        setActiveAddCompo(null);
    }
    useEffect(() => {
        setHide(Hide);
    }, [Hide])
    if (hide) {
        return null;
    }
    /**
     * right now we have NewTask compo it has tow useState hide and activeAddCompo 
     * hide === true ? NewTask will render null : NewTask will render list of add components lisnks
     * hide is bening initialy set by the Hide prop form App.jsx and the Hide prop in App.jsx is given a hideAddTask as a value where hideAddTask is a useState in App.jsx and the setHideAddTask is being passed as a prop to the NavBottom component so it will set hideAddTask to !hideAddTask when the add button is clicked wich will cos the App.jsx to re render with the new value of hideAddTask and send it to NewTask as a prop under the name of Hide which will cos NewTask to set hide to Hide value at the useEffect function and that will get NewTask to rerender and if Hide === hide === false NewTask will render the List of Add compomnents
     * 
     * activeAddCompo === null ? NewTask will render the add compomnents list : it wil render one of the add componnets acording to the value of activeAddCompo Ex: activeAddcompo === 'AddTask' && will render the AddTask Component
     * 
     * each Add component is taking the setHide funtion as a prop under the name of closeAddTapFunc so the add component will be apel to close the whole NewTask compo by seting the hide to ture 
     */
    return (
        <>
            {/* closeAddFunc(); setActiveAddCompo(null) */}
            <div onClick={() => { setHideAndhideAddTask() }} className={Styles.NewTaskOuterWarper}>
                <div onClick={(e) => { e.stopPropagation() }} className={Styles.NewTaskInerWarper}>

                    {
                        activeAddCompo === null ?
                            (
                                <>
                                    <div className={Styles.addTaskDiv + ' ' + Styles.addDiv}>
                                        <span onClick={() => { setActiveAddCompo('AddTask') }} className={Styles.addSpan}>
                                            Add Task
                                        </span>
                                    </div>
                                    <div className={Styles.addQuickDiv + ' ' + Styles.addDiv}>
                                        <span onClick={() => { setActiveAddCompo('AddQuick') }} className={Styles.addSpan}>
                                            Add Quick Note
                                        </span>
                                    </div>
                                    <div className={Styles.addMenuDiv + ' ' + Styles.addDiv}>
                                        <span onClick={() => { setActiveAddCompo('AddMenu') }} className={Styles.addSpan}>
                                            Add Category
                                        </span>
                                    </div>
                                </>
                            ) : (
                                null
                            )
                    }
                    <AddTask closeAddTapFunc={() => { setHideAndhideAddTask() }} activeAddCompo={activeAddCompo} taskId={null} />

                    <AddQuick closeAddTapFunc={() => { setHideAndhideAddTask() }} activeAddCompo={activeAddCompo} taskId={null} />

                    <AddMenu closeAddTapFunc={() => { setHideAndhideAddTask() }} activeAddCompo={activeAddCompo} groupId={null} />
                </div>
            </div>
        </>
    )
}
