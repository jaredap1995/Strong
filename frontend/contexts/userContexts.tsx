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


type User = {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

type UserContextType = {
    user: User | null;
    signIn: (email: string, password: string) => void;
    signOut: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const signIn = (email: string, password: string) => {
        if (email === mockDB.email && password === mockDB.password){
            setUser({
                firstname: "John",
                lastname: "Doe",
                email,
                password
            });
        } else {
            alert(" No account found")
        }
    };

    const signOut = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider value={{ user, signIn, signOut }}>
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