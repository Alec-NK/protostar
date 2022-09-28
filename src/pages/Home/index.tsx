import { Avatar, Badge } from "@chakra-ui/react";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";

import { ProjectsData } from "../Projects";

import { Container, Header, Description, Members, SubHeading, MembersList } from "./styles";

type MemberType = {
    id: number;
    email: string;
    password: string;
    username: string;
};

const Home = () => {
    const { user } = useContext(AuthContext);
    const [project, setProject] = useState<ProjectsData>({} as ProjectsData);
    const [members, setMembers] = useState<MemberType[]>([]);

    const getProjectMembers = useCallback(async () => {
        let proj = {} as ProjectsData;
        await api
            .get(`/projeto/${user.selectedProject}`)
            .then((response) => {
                proj = response.data;
                setProject(response.data);
            })
            .catch((error) => {
                console.log("Erro projeto");
            });

        await api
            .get(`/usuarios/${proj.participants[0]}`)
            .then((response) => {
                setMembers([response.data]);
            })
            .catch((error) => {
                console.log("Erro projeto");
            });
    }, [user]);

    useEffect(() => {
        getProjectMembers();
    }, [user, getProjectMembers]);

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
                    <div className="header_members">
                        <h2>Membros</h2>
                        <Badge>1</Badge>
                    </div>
                    <MembersList>
                        {members.length > 0 &&
                            members.map((member, index) => {
                                return (
                                    <div key={index} className="card_member">
                                        <Avatar name={member.username} size="sm" />
                                        <div className="member_name">{member.username}</div>
                                    </div>
                                );
                            })}
                    </MembersList>
                </Members>
            </div>
        </Container>
    );
};

export default Home;
