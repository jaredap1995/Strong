import { mock } from 'node:test';
import { createContext, useContext, ReactNode, useState } from 'react';
import { useRouter } from "next/router";


interface mockDB {
    firstname: string
    lastname: string
    phone?: string
    email: string
    password: string
    confirmPassword: string
}


const mockDB = {
    firstname: "Jared",
    lastname: "Perez",
    phone: "2",
    email: "hello",
    password: "world",
    confirmPassword: "world"
}

interface newDetails {
    newDetails: User
}


type User = {
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
    password: string | undefined;
}

type UserContextType = {
    user: User | null;
    signIn: (email: string, password: string) => boolean;
    signOut: () => void;
    updateUser: (newDetails: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const signIn = (email: string, password: string): boolean => {
        if (email === mockDB.email && password === mockDB.password){
            setUser({
                firstname: mockDB.firstname,
                lastname: mockDB.lastname,
                email: mockDB.email,
                password: mockDB.password
            });
            router.push("./myAccount");
            return true;
        } else if (!email || !password){
            return true
        }
        else {
            return false
        }
    };

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
        <UserContext.Provider value={{ user, signIn, signOut, updateUser }}>
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