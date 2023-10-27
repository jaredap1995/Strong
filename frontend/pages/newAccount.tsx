import React, { useState } from "react";
import styles from './newAccount.module.scss';
import sharedStyles from './shared.module.scss'
import { useRouter } from "next/router";
import Link from "next/link";
import { event } from "jquery";

const account: React.FC = () => {

    const [signedIn, setSignedIn] = useState(false)
    const [noAccount, setNoAccount] = useState(false)
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        phone: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    interface mockDB {
        email: string
        password: string
    }

    const mockDB = {
        email: "hello",
        password: "world"
    }

    // back button function
    const router = useRouter();
    const backClick = () => {
        router.back();
    }

    // Function to submit signIn
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSignedIn(true);

        if (formData.email && formData.password) {
            if ((formData.email === mockDB.email) && (formData.password === mockDB.password)){
                // setting thank you for now, will work out logic for an actual sign in
                window.location.href = './thank-you'
            } else {
                setNoAccount(true);
                return
            }
        }

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
            <div className={`${styles.newAccountContainer} ${noAccount ? styles.modalActive : ''}`}>
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
                                name="email"
                                className={sharedStyles.waitlistInput}
                                placeholder="Email"
                                onChange={handleInputChange}
                                />
                                {signedIn && !formData.email && 
                                <p className={sharedStyles.waitlistError}>Email is required</p>}
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

                            <button type="submit" className={styles.newSignInSubmit}> Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                {noAccount && (
                    <div className={sharedStyles.modal}> 
                        <div> 
                            No account with that information currently exists
                            <button className={sharedStyles.closeButton} onClick={() => setNoAccount(false)}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default account;