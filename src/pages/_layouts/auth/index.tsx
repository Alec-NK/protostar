import React from "react";
import { Container } from "./style";

type AuthProps = {
    children: React.ReactNode;
};

const AuthLayout = ({ children }: AuthProps) => {
    return <Container>{children}</Container>;
};

export default AuthLayout;
