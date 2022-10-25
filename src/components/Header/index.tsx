import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Avatar,
    IconButton,
    Link,
    Menu,
    MenuButton,
    MenuGroup,
    MenuItem,
    MenuList,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
    Wrap,
    WrapItem,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import useInterval from "../../hooks/useInterval";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";

import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineExitToApp } from "react-icons/md";
import { FaCheck } from "react-icons/fa";

import { NotificationType } from "../../pages/Notifications";

import { Container, Notification, NotificationItem } from "./styles";

const Header = () => {
    const navigate = useNavigate();
    const { user, signOut } = useContext(AuthContext);
    const [newNotifications, setNewNotifications] = useState<NotificationType[]>([]);

    const logOut = useCallback(async () => {
        await signOut();
        navigate("/");
    }, [navigate, signOut]);

    const getNotifications = useCallback(async () => {
        await api
            .get(`/notificacao/`)
            .then((response) => {
                const userNotifications = response.data.filter((notification: NotificationType) => {
                    return notification.funcao_notificacao === user.funcao_usuario;
                });

                const newNotifications = userNotifications.filter(
                    (notification: NotificationType) => {
                        return !notification.notificado;
                    }
                );

                setNewNotifications(newNotifications);
            })
            .catch((error) => {
                toast.error("Erro na notificação");
            });
    }, []);

    const notificated = useCallback(
        async (nt: NotificationType) => {
            const dataNotification = {
                title: nt.title,
                mensagem: nt.mensagem,
                notificado: true,
            };

            await api
                .put(`/notificacao/${nt.id}/`, dataNotification)
                .then((response) => {
                    const restNotifications = newNotifications.filter((notification) => {
                        return notification.id !== nt.id;
                    });

                    setNewNotifications(restNotifications);
                })
                .catch((error) => {
                    toast.error("Erro na notificação");
                });
        },
        [newNotifications]
    );

    const handleLink = () => {
        navigate("/notificacoes");
    };

    useInterval(() => {
        getNotifications();
    }, 15000);

    useEffect(() => {
        getNotifications();
    }, []);

    return (
        <Container>
            <Popover placement="bottom-end">
                <PopoverTrigger>
                    <Notification>
                        <IoMdNotificationsOutline />
                        {newNotifications.length > 0 ? (
                            <span className="badge">{newNotifications.length}</span>
                        ) : (
                            <div />
                        )}
                    </Notification>
                </PopoverTrigger>
                <Portal>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverHeader fontWeight="semibold">
                            <h2>Notificações</h2>
                        </PopoverHeader>
                        <PopoverCloseButton />
                        <PopoverBody>
                            {newNotifications.map((newNotification, index) => {
                                return (
                                    <NotificationItem key={index}>
                                        <div>
                                            <div className="title">{newNotification.title}</div>
                                            <div className="description">
                                                {newNotification.mensagem.length >= 22
                                                    ? `${newNotification.mensagem.substring(
                                                          0,
                                                          22
                                                      )}...`
                                                    : newNotification.mensagem}
                                            </div>
                                        </div>
                                        <div>
                                            <IconButton
                                                variant="outline"
                                                colorScheme="teal"
                                                aria-label="Check"
                                                size="xs"
                                                icon={<FaCheck />}
                                                onClick={() => notificated(newNotification)}
                                            />
                                        </div>
                                    </NotificationItem>
                                );
                            })}
                        </PopoverBody>
                        <PopoverFooter display="flex" justifyContent="center">
                            <Link color="#fab039" fontSize="15px" onClick={handleLink}>
                                Histórico de Notificações
                            </Link>
                        </PopoverFooter>
                    </PopoverContent>
                </Portal>
            </Popover>
            <Menu>
                <MenuButton>
                    <Wrap>
                        <WrapItem>
                            <Avatar size="sm" name={user.username} src="" />
                        </WrapItem>
                    </Wrap>
                </MenuButton>
                <MenuList>
                    <MenuGroup title={user.username} marginBottom="15px">
                        <MenuItem className="button_logout" onClick={logOut}>
                            <MdOutlineExitToApp /> <span>Sair</span>
                        </MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>
        </Container>
    );
};

export default Header;
