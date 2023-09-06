import React, { useState } from 'react'
import Header from './Header'
import styles from './CSS/Home.module.css'
import NavBottom from './NavBottom'
import MyTasks from './MyTasks'
import { Link } from 'react-router-dom'


export default function Home() {
    const [curentPage, setCurentPage] = useState('MyTasks')
    const Pages = [
        {
            id: 'page_0', activeImgUrl: 'http://localhost:5173/photos/navIcons/navBtn_1_w.svg',
            imgUrl: 'http://localhost:5173/photos/navIcons/navBtn_1.svg',
            title: 'My Tasks', action: () => {
                // console.log('this is page_0') 
            }
        },
        {
            id: 'page_1', activeImgUrl: 'http://localhost:5173/photos/navIcons/navBtn_2_w.svg',
            imgUrl: 'http://localhost:5173/photos/navIcons/navBtn_2.svg',
            title: 'Mnue', action: () => {
                // console.log('this is page_0') 
            }
        },
        {
            id: 'page_2', activeImgUrl: null, imgUrl: null, title: null, action: () => {
                // console.log('this is page_2') 
            }
        }
        ,
        {
            id: 'page_3', activeImgUrl: 'http://localhost:5173/photos/navIcons/navBtn_3_w.svg',
            imgUrl: 'http://localhost:5173/photos/navIcons/navBtn_3.svg',
            title: 'Quick', action: () => {
                // console.log('this is page_3') 
            }
        },
        {
            id: 'page_4', activeImgUrl: 'http://localhost:5173/photos/navIcons/navBtn_4_w.svg',
            imgUrl: 'http://localhost:5173/photos/navIcons/navBtn_4.svg',
            title: 'Profile', action: () => {
                // console.log('this is page_4') 
            }
        }

    ]

    return (
        <>
            {/* <Header /> */}
            <div className={styles.homeBody} >
                <Link to="/mnue">
                    <button>Home</button>
                </Link>
            </div>
            {/* <NavBottom Pages={Pages} /> */}

        </>
    )
}
