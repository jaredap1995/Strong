import { createContext, useContext, ReactNode, useState } from 'react';
import { useRouter } from "next/router";
import { fetchUser, createUser, updateUser } from "../data/api";
import { get } from 'jquery';


type User = {
    id: number | undefined;
    username: string | undefined;
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
    updateDetails: (newDetails: User | null) => void;
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

    const updateDetails = async (newDetails: User | null) => {
        if (!newDetails || !newDetails.username ){
            console.error("Invalid user details")
            return;
        }
        try {
            const response = await updateUser(newDetails.id, newDetails);
            if (response.status !== 200) {
                throw new Error("Error updating User")
            }
            const updatedUser = await fetchUser(newDetails.email);
            setUser(updatedUser.data);
        } catch (error: unknown) {
            console.error("Error updating User: ", (error as Error).message)

            setUser(user)
        }
        
    };

    return (
        <UserContext.Provider value={{ user, signIn, signUp, signOut, updateDetails }}>
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