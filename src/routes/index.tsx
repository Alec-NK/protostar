import { Route, Routes } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Projects from "../pages/Projects";
import Home from "../pages/Home";
import Requirements from "../pages/Requirements";
import Changes from "../pages/Changes";
import Solicitations from "../pages/Solicitations";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Artefacts from "../pages/Artefacts";

const IndexRoutes = () => (
    <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/cadastro" element={<SignUp />} />
        <Route path="/projetos" element={<PrivateRoute element={Projects} />} />
        <Route path="/inicio" element={<PrivateRoute element={Home} />} />
        <Route path="/requisitos" element={<PrivateRoute element={Requirements} />} />
        <Route path="/mudancas" element={<PrivateRoute element={Changes} />} />
        <Route path="/solicitacoes" element={<PrivateRoute element={Solicitations} />} />
        <Route path="/artefatos" element={<PrivateRoute element={Artefacts} />} />
    </Routes>
);

export default IndexRoutes;
