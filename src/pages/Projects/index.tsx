import { Avatar, AvatarGroup, Divider } from "@chakra-ui/react";
import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../contexts/AuthContext";

import { Card, Content, Header } from "./styles";

export type ProjectsData = {
    id: number;
    title: string;
    description: string;
    participants: Array<number>;
};

const Projects: React.FC = () => {
    const { user, updateSelectedProject } = useContext(AuthContext);
    const navigate = useNavigate();

    const selectProject = useCallback(
        (id: number) => {
            updateSelectedProject(id);
            navigate("/inicio");
        },
        [navigate, updateSelectedProject]
    );

    return (
        <div>
            <Header>
                <h1>Bem-vindo, {user.username}!</h1>
            </Header>
            <Content>
                <h2>PROJETOS</h2>
                <Divider />
                <div className="projects">
                    {user.projects.map((project) => {
                        return (
                            <Card onClick={() => selectProject(project.id)}>
                                <div className="name_project">{project.title.toUpperCase()}</div>
                                <div className="description_project">
                                    {project.description}
                                    {/* 225 chr */}
                                </div>
                                <AvatarGroup size="md" max={3}>
                                    {project.participants.map((member) => {
                                        return <Avatar name="teste" src="" />;
                                    })}
                                </AvatarGroup>
                            </Card>
                        );
                    })}
                    {user.projects.length === 0 && <Card disabled />}
                </div>
            </Content>
        </div>
    );
};

export default Projects;
