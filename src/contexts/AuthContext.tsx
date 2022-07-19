import React, { createContext } from "react";

type AuthContextProps = {
    signIn: () => void;
    authenticated: () => boolean;
};

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const signIn = () => {
        console.log("Testando context");
    };

    const authenticated = () => {
        return true;
    };

    return (
        <AuthContext.Provider value={{ signIn, authenticated }}>{children}</AuthContext.Provider>
    );
};
