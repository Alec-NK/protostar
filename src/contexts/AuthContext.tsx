import React, { createContext, useCallback, useState } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

import { SignInInputs } from "../pages/SignIn";
import { ProjectsData } from "../pages/Projects";

type User = {
    id: number;
    email: string;
    password: string;
    username: string;
    selectedProject?: number;
    date_joined: string;
    first_name: string;
    last_name: string;
    groups: Array<any>;
    is_active: boolean;
    is_staff: boolean;
    is_superuser: boolean;
    last_login: string;
    user_permissions: Array<string>;
    projects: Array<ProjectsData>;
    cargo: string;
    funcao_usuario: string;
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
    updateSelectedProject: (projectId: number) => void;
    authorization: (permissions: string[]) => boolean;
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
        let userData = {} as User;

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
            .post(`/user_id/`, dataSignIn)
            .then((response) => {
                userData = response.data[0];
            })
            .catch(() => {
                console.log("Error user");
            });

        await api
            .post(`/funcao_usuario/`, { id: userData.id })
            .then((response) => {
                userData.cargo = response.data.funcao[0].cargo;
                userData.funcao_usuario = response.data.funcao[0].funcao_usuario;
            })
            .catch((err) => {
                console.log("Error function");
            });

        await api
            .get(`/projeto/`)
            .then((response) => {
                const projects = response.data;

                const memberProjects = projects.filter((project: any) => {
                    return project.participants.some((memberId: any) => {
                        return userData.id === memberId;
                    });
                });

                userData.projects = memberProjects;
            })
            .catch(() => {
                console.log("Erro projetos");
            });

        localStorage.setItem("user", JSON.stringify(userData));
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

    const updateSelectedProject = useCallback(
        (projectId: number) => {
            const clonedUser: User = data.user;

            clonedUser.selectedProject = projectId;

            localStorage.setItem("user", JSON.stringify(clonedUser));
            setData({
                token: data.token,
                user: clonedUser,
            });
        },
        [data]
    );

    const signOut = () => {
        localStorage.removeItem("user_token");
        localStorage.removeItem("user");
        setData({} as AuthData);
    };

    const authorization = (permissions: string[]) => {
        const hasPermission = permissions.some((permission) => {
            return permission === data.user.funcao_usuario;
        });

        return hasPermission;
    };

    return (
        <AuthContext.Provider
            value={{
                user: data.user,
                signIn,
                authenticated,
                signOut,
                updateSelectedProject,
                authorization,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
