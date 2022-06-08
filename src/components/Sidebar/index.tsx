import { NavLink } from "react-router-dom";

import { Container, SideItems } from "./styles";

const Sidebar = () => {
    const menuItems = [
        {
            path: "/",
            name: "Requisitos",
            icon: "",
        },
        {
            path: "/mudanças",
            name: "Mudanças",
            icon: "",
        },
    ];

    return (
        <Container>
            <div className="logo">protostar logo</div>
            {menuItems.map((item, index) => (
                <SideItems>
                    <NavLink to={item.path} key={index} className="link">
                        <div className="link_text">{item.name}</div>
                    </NavLink>
                </SideItems>
            ))}
        </Container>
    );
};

export default Sidebar;
