import React, { useState } from "react";
import styles from './newAccount.module.scss';
import sharedStyles from './shared.module.scss'
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "@/contexts/userContexts";

const NewAccount: React.FC = () => {

    const [isSubmitted, setIsSubmitted] = useState(false)
    const [signedIn, setSignedIn] = useState(false)
    const [newAccount, setNewAccount] = useState(false)
    const[repeatAccount, setRepeatAccount] = useState(false)
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    // back button function
    const router = useRouter();
    const backClick = () => {
        router.back();
    }

    const { signUp } = useUser()
    // Function to submit signIn
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitted(true);
        const success: boolean = await signUp(formData);
        if (success) setNewAccount(true);

        // const { firstname, lastname, phone, email, password, confirmPassword } = formData;

        // if (email && password && firstname && lastname && confirmPassword) {
        //     if ((email === mockDB.email) && (firstname === mockDB.firstname) && (lastname === mockDB.lastname) ){
        //         setRepeatAccount(true)
        //         return
        //     } else {
        //         setNewAccount(true);
        //     }
        // }

    }

    // Function to handle input changes
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };



    return (
        <div>
            <div className={`${styles.newAccountContainer} ${newAccount ? styles.modalActive : ''} ${repeatAccount ? styles.modalActive: ''}`}>
                <button className={sharedStyles.backButton} onClick={backClick}></button>
                <div className={styles.newAccountPageContent}>
                    {/* this is the content container...text to be removed */}
                    <div className={styles.newAuthHeader}>
                        <span className={styles.newAuthHeaderText}> Already have an account?</span>
                        <Link className={styles.newCreateAccountButton} href="./signIn"> Sign In </Link>
                    </div>
                    <div className={styles.newTextFormContainer}>
                        <h1 className={styles.newSignInFont}> Join the Revolution. Create your Strong Account. </h1>
                        <form className={sharedStyles.userInputForm} onSubmit={handleSubmit}>
                            <fieldset className={sharedStyles.waitlistFieldset}>
                                <input 
                                type="text"
                                name="firstname"
                                className={sharedStyles.waitlistInput}
                                placeholder="First name"
                                onChange={handleInputChange}
                                />
                                {signedIn && !formData.firstname && 
                                <p className={sharedStyles.waitlistError}>First name is required</p>}
                            </fieldset>

                            <fieldset className={sharedStyles.waitlistFieldset}>
                                <input 
                                type="text"
                                name="lastname"
                                className={sharedStyles.waitlistInput}
                                placeholder="Last name"
                                onChange={handleInputChange}
                                />
                                {signedIn && !formData.lastname && 
                                <p className={sharedStyles.waitlistError}>Last name is required</p>}
                            </fieldset>

                            <fieldset className={sharedStyles.waitlistFieldset}>
                                <input 
                                type="text"
                                name="phone"
                                className={sharedStyles.waitlistInput}
                                placeholder="Phone"
                                onChange={handleInputChange}
                                />
                            </fieldset>


                            <fieldset className={sharedStyles.waitlistFieldset}>
                                <input 
                                type="text"
                                name="username"
                                className={sharedStyles.waitlistInput}
                                placeholder="username"
                                onChange={handleInputChange}
                                />
                                {signedIn && !formData.username && 
                                <p className={sharedStyles.waitlistError}>Username is required</p>}
                            </fieldset>

                            <fieldset className={sharedStyles.waitlistFieldset}>
                                <input 
                                type="text"
                                name="email"
                                className={sharedStyles.waitlistInput}
                                placeholder="email"
                                onChange={handleInputChange}
                                />
                                {signedIn && !formData.email && 
                                <p className={sharedStyles.waitlistError}>Username is required</p>}
                            </fieldset>

                            <fieldset className={sharedStyles.waitlistFieldset}>
                                <input 
                                type="text"
                                name="password"
                                className={sharedStyles.waitlistInput}
                                placeholder="Password"
                                onChange={handleInputChange}
                                />
                                {signedIn && !formData.password && 
                                <p className={sharedStyles.waitlistError}>Password is required</p>}
                            </fieldset>


                            <fieldset className={sharedStyles.waitlistFieldset}>
                                <input 
                                type="text"
                                name="confirmPassword"
                                className={sharedStyles.waitlistInput}
                                placeholder="Confirm your Password"
                                onChange={handleInputChange}
                                />
                                {signedIn && !formData.confirmPassword && 
                                <p className={sharedStyles.waitlistError}>Confirm your password</p>}
                            </fieldset>

                            <button type="submit" className={styles.newSignInSubmit}> Sign up </button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                {newAccount && (
                    <div className={sharedStyles.modal}> 
                        <div> 
                            Thank you for creating an account! You are now logged in and part of the Strong Revolution.
                            <button className={sharedStyles.closeButton} onClick={() => setNewAccount(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
            <div>
                {repeatAccount && (
                    <div className={sharedStyles.modal}>
                        <div> 
                            The email associated with this account already exists. Please try signing in instead.
                            <button className={sharedStyles.closeButton} onClick={() => setRepeatAccount(false)}>Close</button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    )
}

export default NewAccount;