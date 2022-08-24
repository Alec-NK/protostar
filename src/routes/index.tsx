import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Projects from "../pages/Projects";
import Requirements from "../pages/Requirements";
import Changes from "../pages/Changes";
import Solicitations from "../pages/Solicitations";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const IndexRoutes = () => (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/projetos" element={<PrivateRoute element={Projects} />} />
        <Route path="/requisitos" element={<PrivateRoute element={Requirements} />} />
        <Route path="/mudancas" element={<PrivateRoute element={Changes} />} />
        <Route path="/solicitacoes" element={<PrivateRoute element={Solicitations} />} />
    </Routes>
);

export default IndexRoutes;
