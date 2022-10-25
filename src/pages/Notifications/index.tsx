import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../contexts/AuthContext";
import api from "../../services/api";
import ItemTable from "./ItemTable";

import { Container, ContentTable, Header, HeaderTable, TableList } from "./styles";

export type NotificationType = {
    id: number;
    title: string;
    mensagem: string;
    notificado: boolean;
    funcao_notificacao: string;
};

const Notifications = () => {
    const { user } = useContext(AuthContext);
    const [newNotifications, setNewNotifications] = useState<NotificationType[]>([]);

    const getNotifications = useCallback(async () => {
        await api
            .get(`/notificacao/`)
            .then((response) => {
                const userNotifications = response.data.filter((notification: NotificationType) => {
                    return notification.funcao_notificacao === user.funcao_usuario;
                });

                setNewNotifications(userNotifications);
            })
            .catch((error) => {
                toast.error("Erro na notificação");
            });
    }, []);

    useEffect(() => {
        getNotifications();
    }, []);

    return (
        <Container>
            <Header>
                <h1>NOTIFICAÇÕES</h1>
            </Header>
            <TableList>
                <HeaderTable>
                    <div>ID</div>
                    <div>Título</div>
                    <div>Mensagem</div>
                </HeaderTable>
                <ContentTable>
                    {newNotifications.map((notification, index) => {
                        return <ItemTable key={index} id={index} data={notification} />;
                    })}
                </ContentTable>
            </TableList>
        </Container>
    );
};

export default Notifications;
