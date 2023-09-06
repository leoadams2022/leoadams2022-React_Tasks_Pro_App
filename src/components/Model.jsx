import React from 'react'
import styles from './CSS/Model.module.css'
export default function Model({ txt, okayAction, cancelAction }) {
    return (
        <div className={styles.modelWarpper} onClick={cancelAction}>
            <div className={styles.innerWarpper} onClick={(e) => { e.stopPropagation() }}>
                <div className={styles.txtDiv}>
                    <p className={styles.txtP}>
                        {txt}
                    </p>
                </div>
                <div className={styles.BtnsDiv}>
                    <button onClick={okayAction} className={styles.btn + ' ' + styles.okayBtn}>Okay</button>
                    <button onClick={cancelAction} className={styles.btn + ' ' + styles.cancelBtn}>Cancel</button>
                </div>
            </div>
        </div>
    )
}
