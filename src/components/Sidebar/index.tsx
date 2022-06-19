import { NavLink, useLocation } from "react-router-dom";
import { FaList } from "react-icons/fa";
import { MdPublishedWithChanges } from "react-icons/md";

import { Container, SideItems } from "./styles";

const Sidebar = () => {
    const location = useLocation();
    const menuItems = [
        {
            path: "/",
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

    return (
        <Container>
            <div className="logo">
                <img src="images/logo_protostar.png" alt="Protostar" />
            </div>
            {/* <div className="title">MENU</div> */}
            {menuItems.map((item, index) => (
                <SideItems active={item.path === location.pathname}>
                    <NavLink to={item.path} key={index} className="link">
                        <div className="link_icon">{item.icon}</div>
                        <div className="link_text">{item.name}</div>
                    </NavLink>
                </SideItems>
            ))}
        </Container>
    );
};

export default Sidebar;
