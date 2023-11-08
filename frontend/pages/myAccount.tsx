import React from "react";
import Link from "next/link";
import styles from './myAccount.module.scss'
import { useState, useEffect } from "react";
import sharedStyles from './shared.module.scss'
import { useUser } from "@/contexts/userContexts";

var MyAccount: React.FC = () => {

    const [isDetails, setIsDetails] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    const { user, updateUser } = useUser();

    const [detailsData, setDetailsaData] = useState({
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        password: user?.password
    })

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (detailsData.firstname !== user?.firstname || detailsData.lastname !== user?.lastname || detailsData.password !== user?.password || detailsData.email !== user?.email) {
            updateUser(detailsData)
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDetailsaData(prevData => ({
            ...prevData,
            [name]: value
        }))
        
    };


    useEffect(() => {
        if (user) {
            setDetailsaData({
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '', 
                password: '' 
            });
        }
    }, [user]);

    return (
        <div className={styles.myAccountContainer}>
            <div className={`${styles.myAccountSidebar}`}>
                My Account
                <div className={styles.sidebarOptions}>
                    <button className={sharedStyles.navBarButton} onClick={() => setIsDetails(true)}>Details</button>
                    <button className={sharedStyles.navBarButton} onClick={() => setIsDetails(false)}>Inquire</button>
                </div>
            </div>
            {isDetails && (
            <div className={styles.myDetailsPage}>
                <h2 className={styles.detailsPageHeader}> Basic Information </h2> 
                <form className={sharedStyles.userInputForm} onSubmit={handleSubmit}> 
                    <fieldset className={sharedStyles.waitlistFieldset}>
                        Preferred name
                        <input 
                        type="text"
                        name="preferredname"
                        className={sharedStyles.waitlistInput}
                        placeholder="-"
                        onChange={handleInputChange}
                        readOnly={!isEditMode}
                        />
                    </fieldset>

                    <fieldset className={sharedStyles.waitlistFieldset}>
                        First Name
                        <input 
                        type="text"
                        name="firstname"
                        className={sharedStyles.waitlistInput}
                        value={detailsData.firstname}
                        onChange={handleInputChange}
                        readOnly={!isEditMode}
                        />

                    </fieldset>

                    <fieldset className={sharedStyles.waitlistFieldset}>
                        Last Name
                        <input 
                        type="text"
                        name="lastname"
                        className={sharedStyles.waitlistInput}
                        value={detailsData.lastname}
                        onChange={handleInputChange}
                        readOnly={!isEditMode}
                        />

                    </fieldset>

                    <fieldset className={sharedStyles.waitlistFieldset}>
                        Email
                        <input 
                        type="text"
                        name="email"
                        className={sharedStyles.waitlistInput}
                        value={detailsData.email}
                        onChange={handleInputChange}
                        readOnly={!isEditMode}
                        />

                    </fieldset>

                    <fieldset className={sharedStyles.waitlistFieldset}>
                        Password
                        <input 
                        type="text"
                        name="password"
                        className={sharedStyles.waitlistInput}
                        value={detailsData.password}
                        onChange={handleInputChange}
                        readOnly={!isEditMode}
                        />

                    </fieldset>

                    <button type="button" onClick={() => setIsEditMode(!isEditMode)}>
                        {isEditMode ? 'Cancel': 'Edit'}
                    </button>

                    {isEditMode && (
                        <button type = 'submit' className={styles.saveSubmitButton}> Save Changes</button>
                    )}


                </form>
            </div>
            )}
            {!isDetails && (
                <div className={styles.inquiryPage}>
                    <h2 className={styles.inquiryPageHeader}> Inquiries </h2> 
                    <div className={styles.inquiryPageContent}> 
                        <span> Have a question about Strong?</span>
                        <a href="mailto: support@Strong.com" className={styles.emailHyperlink}> 
                            <span className={styles.emailHyperlink}>support@Strong.com</span>
                        </a>
                    </div>
                </div>    
            )}
        </div>
    )
}

export default MyAccount;