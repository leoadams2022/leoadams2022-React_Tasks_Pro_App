import React, { useState } from 'react'
import { useLocalStorage } from '../components/LocalStorageContext';
import GroupRow from '../components/GroupRow';
import styles from '../components/CSS/Menu.module.css'
import AddMenu from '../components/AddMenu'
export default function Mnue({ todayOrMonth, filterType }) {
    const { data } = useLocalStorage();
    const [showOp, setShowOp] = useState(0)
    const [groupId, setGroupId] = useState(null);
    const [openEdit, setOpenEdit] = useState(0);
    const GroupsObj = data[1].Groups;
    return (
        <>
            <div className={styles.menuWarpper} onClick={() => { setShowOp(null) }}>
                {
                    GroupsObj.map((group, i) => {
                        return (
                            <GroupRow
                                key={new Date().getTime() + '_' + Math.random().toString(36).substr(2, 9)}
                                id={group.id}
                                title={group.title}
                                color={group.color}
                                openEdit={() => { setGroupId(group.id); setOpenEdit((pre) => (!pre)) }}
                                switchOp={() => { setShowOp((pre) => (pre === group.id ? null : group.id)) }}
                                showOp={showOp}
                            />
                        )
                    })
                }
                {
                    openEdit === true ?
                        (<div className={styles.editContaineer} onClick={() => { setOpenEdit((pre) => (!pre)); setShowOp(null) }}>
                            <div className={styles.editInnerContaineer} onClick={(e) => { e.stopPropagation() }}>
                                <AddMenu
                                    groupId={groupId}
                                    activeAddCompo={'AddMenu'}
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
