import { createContext, useContext, ReactNode, useState } from 'react';
import { useRouter } from "next/router";
import { fetchUser, createUser } from "../data/api";


type User = {
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

type UserContextType = {
    user: User | null;
    signIn: (email: string, password: string) => Promise<boolean>;
    signUp: (data: UserData) => Promise<boolean>;
    signOut: () => void;
    updateUser: (newDetails: User | null) => void;
}

type UserData = {
    firstname?: string;
    lastname?: string;
    phone?: string;
    username: string;
    email: string;
    password: string;
    confirmPassword?: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const signIn = async (email: string, password: string) => {
        try {
            const response = await fetchUser(email);
            setUser(response.data);
            router.push("./myAccount");
            return true;
        } catch (error: unknown) {
            console.error("Error signing in: ", (error as Error).message);
            return false
        }
    };

    const signUp = async (data: UserData) => {
        try {
            await createUser(data);
            signIn(data.username, data.password);
            return true;
        } catch (error: unknown) {
            console.error("Error Creating User: ", (error as Error).message)
            return false
        }
    }
    
    
    // *******Old sign in function*****
    // (email: string, password: string): boolean => {
    //     if (email === mockDB.email && password === mockDB.password){
    //         setUser({
    //             firstname: mockDB.firstname,
    //             lastname: mockDB.lastname,
    //             email: mockDB.email,
    //             password: mockDB.password
    //         });
    //         router.push("./myAccount");
    //         return true;
    //     } else if (!email || !password){
    //         return true
    //     }
    //     else {
    //         return false
    //     }
    // };

    const signOut = () => {
        setUser(null);
    }

    const updateUser = (newDetails: User | null) => {
        setUser((currentUser) => {
            // Run call to backend database to change current User based on new updated
            // user data

            return {
                ...currentUser,
                firstname: newDetails?.firstname ?? currentUser?.firstname,
                lastname: newDetails?.lastname ?? currentUser?.lastname,
                email: newDetails?.email ?? currentUser?.email,
                password: newDetails?.password ?? currentUser?.password,
            };
        });
    };

    return (
        <UserContext.Provider value={{ user, signIn, signUp, signOut, updateUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider")
    }
    return context;
}