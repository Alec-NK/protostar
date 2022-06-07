import Sidebar from "../../../components/Sidebar";

import { Container } from "./styles";

type LayoutProps = {
  children: React.ReactNode;
};

const DefaultLayout = ({ children }: LayoutProps) => {
  return (
    <Container>
      <div className="body">
        <Sidebar />
        <div className="main">
          <div>header</div>
          <div className="content">{children}</div>
        </div>
      </div>
    </Container>
  );
};

export default DefaultLayout;
