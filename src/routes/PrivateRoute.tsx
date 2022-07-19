import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

const PrivateRoute = ({ element: Component }: any) => {
    const { authenticated } = useContext(AuthContext);
    const location = useLocation();

    return (
        <>
            {authenticated() ? (
                <Component />
            ) : (
                <Navigate replace to="/" state={{ from: location }} />
            )}
        </>
    );
};

export default PrivateRoute;
