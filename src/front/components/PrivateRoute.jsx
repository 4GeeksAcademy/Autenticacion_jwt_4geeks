import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

export const PrivateRoute = ({ children }) => {
    const { user } = useAuth();

    // Si no hay usuario, redirige a login
    if (!user) return <Navigate to="/login" />;

    // Si hay usuario, renderiza el contenido protegido
    return children;
};
