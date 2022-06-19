import { Route, Routes } from "react-router-dom";

import Requirements from "../pages/Requirements";
import Changes from "../pages/Changes";
import Solicitations from "../pages/Solicitations";

const IndexRoutes = () => (
    <Routes>
        <Route path="/" element={<Requirements />} />
        <Route path="/mudancas" element={<Changes />} />
        {/* <Route path="/solicitacoes" element={<Solicitations />} /> */}
    </Routes>
);

export default IndexRoutes;
