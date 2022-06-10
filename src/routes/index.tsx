import { Route, Routes } from "react-router-dom";

import Requirements from "../pages/Requirements";
import Changes from "../pages/Changes";

const IndexRoutes = () => (
    <Routes>
        <Route path="/" element={<Requirements />} />
        <Route path="/mudancas" element={<Changes />} />
    </Routes>
);

export default IndexRoutes;
