import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
    return !!localStorage.getItem('token');
};

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    return isAuthenticated() ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
