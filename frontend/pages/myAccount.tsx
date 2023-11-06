import React from "react";
import Link from "next/link";
import styles from './myAccount.module.scss'
import { useState } from "react";

var MyAccount: React.FC = () => {

    const [isDetails, setIsDetails] = useState(true);
    const [isInquiry, setIsInquiry] = useState(false);
    const [detailsData, setDeatilsaData] = useState({
        
    })

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        
    }

    return (
        <div className={styles.myAccountContainer}>
            <div className={styles.myAccountSidebar}>
                My Account
                <div className={styles.sidebarOptions}>
                    <Link href="myAccount/details">Details</Link>
                    <Link href="myAccount/inquiries">Inquire</Link>
                </div>
            </div>
            {isDetails && (
                <div className={styles.myAccountPage}>
                    
                </div>
            )}
        </div>
    )
}

export default MyAccount;