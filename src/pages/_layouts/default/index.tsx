import Header from "../../../components/Header";
import Sidebar from "../../../components/Sidebar";

import { Container } from "./styles";

type LayoutProps = {
    children: React.ReactNode;
};

const DefaultLayout = ({ children }: LayoutProps) => {
    return (
        <Container>
            <Sidebar />
            <Header />
            <div className="content">{children}</div>
        </Container>
    );
};

export default DefaultLayout;
