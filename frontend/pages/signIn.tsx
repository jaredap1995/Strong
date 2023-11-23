import React, { useState } from "react";
import styles from './signIn.module.scss';
import sharedStyles from './shared.module.scss'
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "@/contexts/userContexts";

const SignIn: React.FC = () => {

    const [isSubmitted, setIsSubmitted] = useState(false)
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

    // back button function
    const router = useRouter();
    const backClick = () => {
        router.back();
    }

    const { signIn } = useUser()
    // Function to submit signIn
    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitted(true);
        const success: boolean = await signIn(formData.email, formData.password);
        if (!success) {
            setNoAccount(true)
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
            <div className={`${styles.accountPageContainer} ${noAccount ? styles.modalActive : ''}`}>
                <button className={sharedStyles.backButton} onClick={backClick}></button>
                <div className={styles.accountPageContent}>
                    {/* this is the content container...text to be removed */}
                    <div className={styles.authHeader}>
                        <span className={styles.authHeaderText}> Dont have an account?</span>
                        <Link className={styles.createAccountButton} href="./newAccount"> Create Account </Link>
                    </div>
                    <div className={styles.textFormContainer}>
                        <h1 className={styles.signInFont}> Sign In </h1>
                        <form className={sharedStyles.userInputForm} onSubmit={handleSubmit}>
                            <fieldset className={sharedStyles.waitlistFieldset}>
                                <input 
                                type="text"
                                name="email"
                                className={sharedStyles.waitlistInput}
                                placeholder="Email"
                                onChange={handleInputChange}
                                />

                                {isSubmitted && !formData.email && 
                                    <p className={sharedStyles.waitlistError}> Email is required</p>
                                }
                            </fieldset>

                            <fieldset className={sharedStyles.waitlistFieldset}>
                                <input 
                                type="text"
                                name="password"
                                className={sharedStyles.waitlistInput}
                                placeholder="Password"
                                onChange={handleInputChange}
                                />
                                {isSubmitted && !formData.password && 
                                <p className={sharedStyles.waitlistError}>Password is required</p>}
                            </fieldset>

                            <button type="submit" className={styles.signInSubmit}> Sign in </button>
                        </form>
                    </div>
                </div>
            </div>
            <div>
                {noAccount && (
                    <div className={sharedStyles.modal}> 
                        <div> 
                            No account with that information currently exists
                            <button className={sharedStyles.closeButton} onClick={() => 
                                {setNoAccount(false)
                                setIsSubmitted(false)
                            }}>Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default SignIn;