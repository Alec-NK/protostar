import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Card, Content, Header } from "./styles";

const Projects: React.FC = () => {
    const navigate = useNavigate();
    const selectProject = () => {
        navigate("/inicio");
    };

    return (
        <div>
            <Header>
                <h1>PROJETOS</h1>
            </Header>
            <Content>
                <Card onClick={selectProject}>
                    <div className="name_project">Nome projeto</div>
                    <div className="description_project">
                        Nomeprojetoasdasdasdassdasdadaasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...
                        {/* 225 chr */}
                    </div>
                    <AvatarGroup size="md" max={3}>
                        <Avatar name="Ryan Florence" src="" />
                        <Avatar name="Alec Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                    </AvatarGroup>
                </Card>
                <Card>
                    <div className="name_project">Nome projeto</div>
                    <div className="description_project">
                        Nomeprojetoasdasdasdassdasdadaasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...
                        {/* 225 chr */}
                    </div>
                    <AvatarGroup size="md" max={3}>
                        <Avatar name="Ryan Florence" src="" />
                        <Avatar name="Alec Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                    </AvatarGroup>
                </Card>
                <Card>
                    <div className="name_project">Nome projeto</div>
                    <div className="description_project">
                        Nomeprojetoasdasdasdassdasdadaasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...
                        {/* 225 chr */}
                    </div>
                    <AvatarGroup size="md" max={3}>
                        <Avatar name="Ryan Florence" src="" />
                        <Avatar name="Alec Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                    </AvatarGroup>
                </Card>
                <Card>
                    <div className="name_project">Nome projeto</div>
                    <div className="description_project">
                        Nomeprojetoasdasdasdassdasdadaasdaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa...
                        {/* 225 chr */}
                    </div>
                    <AvatarGroup size="md" max={3}>
                        <Avatar name="Ryan Florence" src="" />
                        <Avatar name="Alec Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                        <Avatar name="Eiki Florence" src="" />
                    </AvatarGroup>
                </Card>
            </Content>
        </div>
    );
};

export default Projects;
