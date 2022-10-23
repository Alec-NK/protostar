import { useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Menu, MenuButton, MenuItem, MenuList, Wrap, WrapItem } from "@chakra-ui/react";

import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineExitToApp } from "react-icons/md";

import { AuthContext } from "../../contexts/AuthContext";

import { Container } from "./styles";

const Header = () => {
    const { user, signOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const logOut = useCallback(async () => {
        await signOut();
        navigate("/");
    }, [navigate, signOut]);

    return (
        <Container>
            <button className="notification_icon">
                <IoMdNotificationsOutline />
            </button>
            <Menu>
                <MenuButton>
                    <Wrap>
                        <WrapItem>
                            <Avatar size="sm" name={user.username} src="" />
                        </WrapItem>
                    </Wrap>
                </MenuButton>
                <MenuList>
                    <MenuItem className="button_logout" onClick={logOut}>
                        <MdOutlineExitToApp /> <span>Sair</span>
                    </MenuItem>
                </MenuList>
            </Menu>
        </Container>
    );
};

export default Header;
