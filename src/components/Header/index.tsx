import { Avatar, Wrap, WrapItem } from "@chakra-ui/react";
import { IoMdNotificationsOutline } from "react-icons/io";

import { Container } from "./styles";

const Header = () => {
    return (
        <Container>
            <button>
                <IoMdNotificationsOutline />
            </button>
            <button>
                <Wrap>
                    <WrapItem>
                        <Avatar size="sm" name="Alec" src="" />
                    </WrapItem>
                </Wrap>
            </button>
        </Container>
    );
};

export default Header;
