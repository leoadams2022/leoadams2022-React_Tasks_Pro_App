import React, { useEffect, useState } from 'react'
import styles from './CSS/Header.module.css'
import { useLocation } from 'react-router-dom'//Link

import FilterIcon from '../assets/photos/optionsIcon.svg'
import cheackedIcon from '../assets/photos/cheackedIcon.svg'
export default function Header({ onTabClick, onFilterClick }) {
    const [optShow, setOptShow] = useState(0);
    const [selectdOpt, setSelectedOpt] = useState(3);
    const [aniClass, setAniClass] = useState('')
    const [selectdTab, setSelectedTab] = useState(1);
    const location = useLocation();// location.pathname
    const [activePage, setActicPage] = useState(location.pathname);
    useEffect(() => {
        setActicPage(location.pathname)
    }, [location.pathname])
    const tapsArr = [
        {
            id: 1, tapTxt: 'Today', action: () => {
                // console.log('Today tap was clicked') 
            }
        },
        {
            id: 2, tapTxt: 'Month', action: () => {
                // console.log('Month tap was clicked')
            }
        }
    ]
    const optArr = [
        {
            id: 1, txt: 'Incomplete Tasks', selected: 1, action: () => {
                // console.log('Incomplete Tasks was clicked') 
            }
        },
        {
            id: 2, txt: 'Completed Tasks', selected: 0, action: () => {
                // console.log('Completed Tasks was clicked') 
            }
        },
        {
            id: 3, txt: 'All Tasks', selected: 0, action: () => {
                // console.log('All Tasks was clicked') 
            }
        },
    ]
    const showOptions = () => {
        setOptShow((pre) => (!pre))
    }
    const selectOpt = (id) => {
        setSelectedOpt(id);
        showOptions()
    }
    useEffect(() => {
        setTimeout(() => {
            setAniClass((optShow ? styles.showOptionsList : ''))
        }, 100)
        return () => {
            // setAniClass('')
        }
    }, [optShow, aniClass])

    return (
        <>
            {(activePage === '/MyTasks' || activePage === '/') ? (
                <div className={styles.headerWarper}>
                    <div className={styles.HeaderRow1}>
                        <h1 className={styles.headerTitle}>Tasks List</h1>
                        <div className={styles.optionsIconWarper}>
                            <img onClick={showOptions} className={styles.OptionsIcon} src={'.' + FilterIcon} alt='Filter' title='Filter options' />
                        </div>
                        <div onClick={showOptions} className={styles.OptionsDiv + ' ' + (optShow ? styles.showOpt : '')}>
                            <ul onClick={(e) => { e.stopPropagation() }} className={styles.OptionsList + ' ' + (aniClass)}>
                                {
                                    optArr.map((opt, i) => {
                                        return (
                                            <li key={opt.id} onClick={() => { selectOpt(opt.id); opt.action(); onFilterClick(opt.txt) }}>
                                                {opt.txt}
                                                <span style={{ display: (selectdOpt === opt.id ? 'initial' : 'none') }}>
                                                    <img className={styles.optionsSelectedIcon} src={'.' + cheackedIcon} alt="" />
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={styles.HeaderRow2}>
                        <div className={styles.tapsDiv}>
                            {
                                tapsArr.map((tab, i) => {
                                    return (
                                        <div className={styles.tabDiv + ' ' + (selectdTab === tab.id ? styles.active : '')} onClick={() => { setSelectedTab(tab.id); tab.action(); onTabClick(tab.tapTxt) }} key={tab.id}>
                                            <p className={styles.tapText}>{tab.tapTxt}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div >
            ) : (
                <div className={styles.headerWarperProjects}>
                    <p>{
                        (activePage === '/Menu' && 'Categorys') ||
                        (activePage === '/Quick' && 'Quick Notes') ||
                        (activePage === '/Profile' && 'Profile')
                    }</p>
                </div>
            )}
        </>
    )
}
