import React, { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

import { SignInInputs } from "../pages/SignIn";

type User = {
    id: number;
    email: string;
    password: string;
    username: string;
    selectedProject?: number;
};

type AuthData = {
    user: User;
    token: string;
};

type AuthContextProps = {
    user: User;
    signIn: (dataSignIn: SignInInputs) => Promise<boolean>;
    authenticated: () => boolean;
    signOut: () => void;
};

type AuthProviderProps = {
    children: React.ReactNode;
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [data, setData] = useState<AuthData>(() => {
        const token = localStorage.getItem("user_token");
        const user = localStorage.getItem("user");

        if (token && user) {
            return { token, user: JSON.parse(user) };
        }

        return {} as AuthData;
    });

    const signIn = async (dataSignIn: SignInInputs) => {
        let allowedLogin = false;
        let token = "";
        let userData: User = {
            id: 0,
            email: "",
            password: "",
            username: "",
        };

        await api
            .post(`/auth/`, dataSignIn)
            .then((response) => {
                token = response.data.token;
                localStorage.setItem("user_token", token);
                allowedLogin = true;
            })
            .catch(() => {
                toast.error("Nome ou senha inválidos");
                allowedLogin = false;
            });

        await api
            .get(`/usuarios/1`)
            .then((response) => {
                userData = response.data;
                localStorage.setItem("user", JSON.stringify(userData));
            })
            .catch(() => {
                console.log("Error user");
            });

        setData({
            token,
            user: userData,
        });

        return allowedLogin;
    };

    const authenticated = () => {
        const token = localStorage.getItem("user_token");

        if (token) {
            return true;
        }

        return false;
    };

    const updateSelectedProject = useCallback((projectId: number) => {
        const clonedUser: User = data.user;

        clonedUser.selectedProject = projectId;

        localStorage.setItem("user", JSON.stringify(clonedUser));
        setData({
            token: data.token,
            user: clonedUser,
        });
    }, []);

    const signOut = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user");
        setData({} as AuthData);
    };

    return (
        <AuthContext.Provider value={{ user: data.user, signIn, authenticated, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};
