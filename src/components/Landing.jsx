import React from 'react' //, { useEffect, useState }
import styles from './CSS/Landing.module.css'
import Slids from './Slids'
import landing_1 from '../assets/photos/landing_1.svg'
import landing_2 from '../assets/photos/landing_2.svg'
import landing_3 from '../assets/photos/landing_3.svg'
import landingBottom from '../assets/photos/landingBottom.svg'
export default function Landing({ Hide, onClick }) {
    if (Hide) {
        return null
    }
    const imgArr = [
        { title: 'Welcom To Tasks Pro', imgUrl: landing_1, text: 'what\'s going to happen tomorrow.', innerText: null },
        { title: 'Work Happens', imgUrl: landing_2, text: 'Get notified when work happens.', innerText: null },
        { title: 'Tasks and Assign', imgUrl: landing_3, text: 'Add and assign Tasks.', innerText: null },
    ]
    return (
        <div className={styles.fullWarper}>
            <div className={styles.topPart}>
                <Slids images={imgArr} withBtns={false} autoSlide={true}></Slids>
            </div>
            <div className={styles.bottomPart}>
                <div className={styles.bottomInnerDiv} style={{
                    background: `url(.${landingBottom})`,
                    backgroundSize: 'cover',
                    position: 'relative',
                }}>
                    <button onClick={() => { onClick() }} className={styles.getStartedBtn}>Get Started</button>
                </div>
            </div>
        </div >
    )
}
