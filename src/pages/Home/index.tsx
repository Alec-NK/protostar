import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";

import { ProjectsData } from "../Projects";

import { Container, Header, Description, Members, SubHeading } from "./styles";

const Home = () => {
    const { user } = useContext(AuthContext);
    const [project, setProject] = useState<ProjectsData>({} as ProjectsData);

    const getProject = useCallback(async () => {
        await api
            .get(`/projeto/${user.selectedProject}`)
            .then((response) => {
                setProject(response.data);
            })
            .catch((error) => {
                console.log("Erro projeto");
            });
    }, [user]);

    useEffect(() => {
        getProject();
    }, [user, getProject]);

    return (
        <Container>
            <Header>
                <h1>{project.title}</h1>
            </Header>
            <div className="row">
                <Description>
                    <SubHeading>Descrição do projeto</SubHeading>
                    <div>{project.description}</div>
                </Description>
                <Members>
                    <SubHeading>Membros</SubHeading>
                </Members>
            </div>
        </Container>
    );
};

export default Home;
