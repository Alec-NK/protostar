import { useCallback, useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { FaList } from "react-icons/fa";
import { MdPublishedWithChanges, MdOutlineExitToApp } from "react-icons/md";

import { AuthContext } from "../../contexts/AuthContext";

import { ButtonLogOut, Container, SideItem } from "./styles";

const Sidebar = () => {
    const { signOut } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const menuItems = [
        {
            path: "/projetos",
            name: "Projetos",
            icon: <FaList />,
        },
        {
            path: "/requisitos",
            name: "Requisitos",
            icon: <FaList />,
        },
        {
            path: "/mudancas",
            name: "Mudanças",
            icon: <MdPublishedWithChanges />,
        },
        // {
        //     path: "/solicitacoes",
        //     name: "Solicitações",
        //     icon: <MdPublishedWithChanges />,
        // },
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
            <div className="pages">
                {/* <div className="title">MENU</div> */}
                {menuItems.map((item, index) => (
                    <SideItem key={index} active={item.path === location.pathname}>
                        <NavLink to={item.path} key={index} className="link">
                            <div className="link_icon">{item.icon}</div>
                            <div className="link_text">{item.name}</div>
                        </NavLink>
                    </SideItem>
                ))}
            </div>
            <ButtonLogOut onClick={logOut}>
                <div className="btn_icon">
                    <MdOutlineExitToApp />
                </div>
                <div className="btn_text">Sair</div>
            </ButtonLogOut>
        </Container>
    );
};

export default Sidebar;
