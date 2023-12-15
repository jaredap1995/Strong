import React from "react";
import Link from "next/link";
import styles from './myAccount.module.scss'
import { useState, useEffect } from "react";
import sharedStyles from './shared.module.scss'
import { useUser } from "@/contexts/userContexts";
import { useRouter } from "next/router";

var MyAccount: React.FC = () => {

    const [isDetails, setIsDetails] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    const { user, updateDetails } = useUser();

    const [detailsData, setDetailsaData] = useState({
        id: user?.id,
        username: user?.username,
        firstname: user?.firstname,
        lastname: user?.lastname,
        email: user?.email,
        password: user?.password
    })

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (detailsData.firstname !== user?.firstname || 
            detailsData.lastname !== user?.lastname || 
            detailsData.password !== user?.password || 
            detailsData.email !== user?.email) {
            updateDetails(detailsData)
        }

        setIsEditMode(false)
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setDetailsaData(prevData => ({
            ...prevData,
            [name]: value
        }))
        
    };

    const router = useRouter()
    const handleCancel = () => {
        setDetailsaData({
            id: user?.id,
            username: user?.username || '',
            firstname: user?.firstname || '',
            lastname: user?.lastname || '',
            email: user?.email || '', 
            password: user?.password || '' 
        });
        setIsEditMode(false)
    }


    useEffect(() => {
        if (user) {
            setDetailsaData({
                id: user?.id,
                username: user?.username || '',
                firstname: user.firstname || '',
                lastname: user.lastname || '',
                email: user.email || '', 
                password: user.password || '' 
            });
        } else {
            router.push('./signIn')
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
                        type="password"
                        name="password"
                        className={sharedStyles.waitlistInput}
                        value={detailsData.password}
                        onChange={handleInputChange}
                        readOnly={!isEditMode}
                        />

                    </fieldset>

                    <button type="button" onClick={
                        () => {
                        if (isEditMode) {
                            handleCancel()
                        } else {
                            setIsEditMode(true)
                        }
                    }}>
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