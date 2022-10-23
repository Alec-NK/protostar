import { useCallback, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { FaList } from "react-icons/fa";
import { IoMdHome, IoMdFolder } from "react-icons/io";
import { MdPublishedWithChanges, MdOutlineSpeakerNotes } from "react-icons/md";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";

import { UserFunctionEnum } from "../../util/Enums";
import { AuthContext } from "../../contexts/AuthContext";

import { Container, SideItem, ButtonProject } from "./styles";

const Sidebar = () => {
    const { signOut, authorization } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const menuItems = [
        {
            path: "/inicio",
            name: "Início",
            icon: <IoMdHome />,
            permissions: [
                UserFunctionEnum.usuario,
                UserFunctionEnum.comite,
                UserFunctionEnum.proprietario,
            ],
        },
        {
            path: "/artefatos",
            name: "Artefatos",
            icon: <HiOutlineDocumentDuplicate />,
            permissions: [
                UserFunctionEnum.usuario,
                UserFunctionEnum.comite,
                UserFunctionEnum.proprietario,
            ],
        },
        {
            path: "/requisitos",
            name: "Requisitos",
            icon: <FaList />,
            permissions: [
                UserFunctionEnum.usuario,
                UserFunctionEnum.comite,
                UserFunctionEnum.proprietario,
            ],
        },
        {
            path: "/mudancas",
            name: "Mudanças",
            icon: <MdPublishedWithChanges />,
            permissions: [
                UserFunctionEnum.usuario,
                UserFunctionEnum.comite,
                UserFunctionEnum.proprietario,
            ],
        },
        {
            path: "/solicitacoes",
            name: "Solicitações",
            icon: <MdOutlineSpeakerNotes />,
            permissions: [UserFunctionEnum.comite, UserFunctionEnum.proprietario],
        },
    ];

    const logOut = useCallback(async () => {
        await signOut();
        navigate("/");
    }, [navigate, signOut]);

    return (
        <Container>
            <div className="logo">
                <img src="images/logo_protostar.png" alt="Protostar" />
            </div>
            <div>
                <div className="title">GERAL</div>
                <ButtonProject onClick={() => navigate("/projetos")}>
                    <div className="btn_icon">
                        <IoMdFolder />
                    </div>
                    <div className="btn_text">Projetos</div>
                </ButtonProject>
            </div>
            <div className="pages">
                <div className="title">MENU</div>
                {menuItems.map((item, index) => {
                    if (authorization(item.permissions)) {
                        return (
                            <SideItem key={index} active={item.path === location.pathname}>
                                <NavLink to={item.path} key={index} className="link">
                                    <div className="link_icon">{item.icon}</div>
                                    <div className="link_text">{item.name}</div>
                                </NavLink>
                            </SideItem>
                        );
                    }

                    return <></>;
                })}
            </div>
        </Container>
    );
};

export default Sidebar;
