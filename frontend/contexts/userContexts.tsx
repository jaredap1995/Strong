import { mock } from 'node:test';
import { createContext, useContext, ReactNode, useState } from 'react';


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
    signIn: (email: string, password: string) => void;
    signOut: () => void;
    updateUser: (newDetails: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const signIn = (email: string, password: string) => {
        if (email === mockDB.email && password === mockDB.password){
            setUser({
                firstname: mockDB.firstname,
                lastname: mockDB.lastname,
                email: mockDB.email,
                password: mockDB.password
            });
        } else {
            alert(" No account found")
        }
    };

    const signOut = () => {
        setUser(null);
    }

    const updateUser = (newDetails: User | null) => {
        setUser((currentUser) => {
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