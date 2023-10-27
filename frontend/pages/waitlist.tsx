import React, { useState } from 'react';
import styles from './waitlist.module.scss';
import sharedStyles from './shared.module.scss';
import { useRouter } from 'next/router';

const Waitlist: React.FC = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: ''
    });

    const [customModal, setCustomModal] = useState(false);
    const router = useRouter();

    const backClick = () => {
        router.back();
    }


    const mockDB: string[] = ['1995@gmail.com'];

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitted(true);

        if (formData.firstname && formData.lastname && formData.email ){
            if (mockDB.includes(formData.email)){
                setCustomModal(true);
                return
            } 

            mockDB.push(formData.email);

            window.location.href = './thank-you'
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    return (
        <div>
            <div className={`${styles.waitlistContainer} ${customModal ? styles.modalActive : ''}`}>
                <button className={sharedStyles.backButton} onClick={backClick}></button>
                <div className={styles.waitlistBody}>
                    <div className={styles.waitlistHeader}>
                        <h1>Strong Vision Initial Product Launch</h1>
                        <h2>Join the waitlist for priority access</h2>
                    </div>
                    <form className={sharedStyles.userInputForm} onSubmit={handleSubmit}>
                        <fieldset className={sharedStyles.waitlistFieldset}>
                            <input 
                                type="text" 
                                name="firstname" 
                                className={sharedStyles.waitlistInput} 
                                placeholder='First name *'
                                onChange={handleInputChange}
                            />
                            {isSubmitted && !formData.firstname && 
                                <p className={sharedStyles.waitlistError}>First name is required</p>
                            }
                        </fieldset>

                        <fieldset className={sharedStyles.waitlistFieldset}>
                            <input 
                                type="text" 
                                name="lastname" 
                                className={sharedStyles.waitlistInput} 
                                placeholder='Last name *'
                                onChange={handleInputChange}
                            />
                            {isSubmitted && !formData.lastname && 
                                <p className={sharedStyles.waitlistError}>Last name is required</p>
                            }
                        </fieldset>

                        <fieldset className={sharedStyles.waitlistFieldset}>
                            <input 
                                type="text" 
                                name="email" 
                                className={sharedStyles.waitlistInput} 
                                placeholder='Email *'
                                onChange={handleInputChange}
                            />
                            {isSubmitted && !formData.email && 
                                <p className={sharedStyles.waitlistError}>Email is required</p>
                            }
                        </fieldset>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
            <div>
                    {customModal && (
                            <div className={sharedStyles.modal}>
                                <div>
                                    This email has already been registered
                                    <button className={sharedStyles.closeButton} onClick={() => setCustomModal(false)}>Close</button>
                                </div>
                            </div>
                        )}
                </div>
        </div>
    )
}

export default Waitlist;
