import { useContext } from "react";
import { useLocation } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import AuthLayout from "./auth";
import DefaultLayout from "./default";
import ProjectsLayout from "./projects";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const { authenticated } = useContext(AuthContext);
    const location = useLocation();

    return (
        <>
            {authenticated() && location.pathname !== "/" && location.pathname !== "/cadastro" ? (
                location.pathname === "/projetos" ? (
                    <ProjectsLayout>{children}</ProjectsLayout>
                ) : (
                    <DefaultLayout>{children}</DefaultLayout>
                )
            ) : (
                <AuthLayout>{children}</AuthLayout>
            )}
        </>
    );
};

export default Layout;
