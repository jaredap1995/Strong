import React, { useEffect } from "react";
import styles from './Navigation.module.scss';
import Link from 'next/link';
import Image from "next/image";
import { useRouter } from 'next/router';
import { useState } from 'react'
import { useUser } from "../contexts/userContexts"
import sharedStyles from '../pages/shared.module.scss'


const LOGO = '/logo/logo2.png';


const Navigation = () => {
    const router = useRouter();

    const aboutEvent = router.pathname === '/' ? "#about" : '/#about';
    const currentPage = router.pathname

    const { user, signOut } = useUser()

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY>50){
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }

    }, [])

    return (
        <header className={ `${styles.navBar} ${isScrolled ? styles.scrolled: ''}`}>

                <Link className={styles.logo} href="/">
                        <Image 
                            src={LOGO}
                            height="100"
                            width="100"
                            alt="website logo"
                        />
                </Link>

                <nav>
                    <ul className={styles.menu}>
                        <li>
                            <Link href={aboutEvent}>
                                About
                            </Link>
                        </li>
                        <li>
                            <Link className={`navlink ${currentPage === "/history" ? "active" : ""}`} href="/history">
                                Media
                            </Link>
                        </li>
                        <li>
                            <Link href="/team">
                                Team
                            </Link>
                        </li>
                        <li>
                            <Link href="/mission">
                                Mission
                            </Link>
                        </li>
                        {user ? (
                            <>
                            <li className={styles.signOutDropdown}> 
                                <div className={styles.dropButton}>
                                    <a> Welcome {user.firstname} </a> 
                                </div>
                                <div className={styles.signOutContent}>
                                    <Link className={sharedStyles.navBarButton} href="myAccount"> Account </Link>
                                    <button onClick={signOut} className={sharedStyles.navBarButton}> Sign Out</button>
                                </div>
                            </li>
                            </>
                        ): 
                        <li>
                            <Link href="/signIn">
                                Account
                            </Link>
                        </li>}
                    </ul>
                </nav>
                
                {/* DropDown Div */}
                <div className={styles.dropdown}>
                    <button className={styles.dropBTN}>
                        <div></div>
                    </button>
                    <div className={styles.dropdownContent}>
                        <Link href={aboutEvent}>About</Link>
                        <Link href="/history">Media</Link>
                        <Link href="/team">Team</Link>
                        <Link href="/mission">Mission</Link>
                        <Link href="/account">Account</Link>
                    </div>
                </div>

                <div className={`${styles.actionButtons}`}>
                        <Link className={`${styles.fullSizeLink} ${styles.shimmerEffect}`} href="/waitlist">
                            Priority Access 
                        </Link>
                </div>
        </header>
    );
};

export default Navigation;
