import React from "react";

import Header from "../../../components/Header";

import { Container, Content } from "./styles";

type ProjectsLayoutProps = {
    children: React.ReactNode;
};

const ProjectsLayout = ({ children }: ProjectsLayoutProps) => {
    return (
        <Container>
            <Header />
            <Content>{children}</Content>
        </Container>
    );
};

export default ProjectsLayout;
