import { Avatar, AvatarGroup } from "@chakra-ui/react";
import { Card, Content, Header } from "./styles";

const Projects: React.FC = () => {
    return (
        <div>
            <Header>
                <h1>PROJETOS</h1>
            </Header>
            <Content>
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
