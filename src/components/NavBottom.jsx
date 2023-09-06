import React, { useEffect, useState } from 'react'
import styles from './CSS/NavBottom.module.css'
import { Link, useLocation } from 'react-router-dom'
// Icons 
import navBtn_1 from '../assets/photos/navIcons/navBtn_1.svg'
import navBtn_1_w from '../assets/photos/navIcons/navBtn_1_w.svg'
import navBtn_2 from '../assets/photos/navIcons/navBtn_2.svg'
import navBtn_2_w from '../assets/photos/navIcons/navBtn_2_w.svg'
import navBtn_3 from '../assets/photos/navIcons/navBtn_3.svg'
import navBtn_3_w from '../assets/photos/navIcons/navBtn_3_w.svg'
import navBtn_4 from '../assets/photos/navIcons/navBtn_4.svg'
import navBtn_4_w from '../assets/photos/navIcons/navBtn_4_w.svg'

export default function NavBottom({ Hide, closeAddFunc }) {
    const [activePage, setActivePage] = useState('page_0');
    const location = useLocation();// location.pathname
    const Pages = [
        {
            id: 'page_0', activeImgUrl: navBtn_1_w,
            imgUrl: navBtn_1,
            title: 'Tasks', action: () => {
                // console.log('this is page_0') 
            },
            path: '/MyTasks'
        },
        {
            id: 'page_1', activeImgUrl: navBtn_2_w,
            imgUrl: navBtn_2,
            title: 'Categorys', action: () => {
                // console.log('this is page_0') 
            },
            path: '/Menu'
        },
        {
            id: 'page_2', activeImgUrl: null, imgUrl: null, title: null,
            action: () => {
                // console.log('this is page_2') 
            },
            path: '/NewTask'
        },
        {
            id: 'page_3', activeImgUrl: navBtn_3_w,
            imgUrl: navBtn_3,
            title: 'Quick', action: () => {
                // console.log('this is page_3') 
            },
            path: '/Quick'
        },
        {
            id: 'page_4', activeImgUrl: navBtn_4_w,
            imgUrl: navBtn_4,
            title: 'Profile', action: () => {
                // console.log('this is page_4') 
            },
            path: '/Profile'
        }

    ]
    useEffect(() => {
        Pages.forEach((page) => {
            if (page.path === location.pathname) {
                setActivePage(page.id)
            }
        })
        return () => {
            setActivePage('page_0')
        };
    })
    if (Hide) {
        return null
    }
    return (
        <div className={styles.navContainer}>
            <div className={styles.btnsWarper}>
                {
                    Pages.map((page, i) => {
                        return (
                            page.title != null ? (
                                <div key={page.id} className={styles.btnDiv + ' ' + (page.id === activePage ? styles.active : '')}>
                                    <Link to={page.path}>
                                        <img onClick={() => { setActivePage(page.id); page.action(); }} className={styles.btnImg} src={page.id === activePage ? '.' + page.activeImgUrl : '.' + page.imgUrl} alt="" />
                                    </Link>
                                    <Link to={page.path}>
                                        <span onClick={() => { setActivePage(page.id); page.action(); }} className={styles.btnSpan}>{page.title}</span>
                                    </Link>
                                </div>
                            ) : (
                                <div key={page.id} className={styles.btnDiv + ' ' + styles.addBtnDiv}>
                                    {/* <Link to={page.path}> */}
                                    <div onClick={() => { page.action(); closeAddFunc() }} className={styles.addBtnDivCer}>
                                        <span>+</span>
                                    </div>
                                    {/* </Link> */}
                                </div>
                            )
                        )
                    })
                }
            </div>
        </div >
    )
}
