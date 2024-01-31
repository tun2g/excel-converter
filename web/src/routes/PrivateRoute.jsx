import { Navigate, Outlet } from "react-router-dom";
import config from "./config";
import PropTypes from 'prop-types';

function PrivateRoute({ allowedRoles }) {
    
    const roles = ['Admin'];

    return roles.find((role) => allowedRoles?.includes(role)) ? <Outlet /> : <Navigate to={config.PublicRoutes.login} />;
}

PrivateRoute.propTypes = {
    allowedRoles: PropTypes.node // Prop validation for children
  };

export default PrivateRoute;
