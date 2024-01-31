//config
import config from './config'

//Layouts
import AdminLayout from '../containers/layouts/AdminLayout';
import PublicLayout from '../containers/layouts/PublicLayout';

//pages
/**
 * Home pages
 */
import Home from '../containers/pages/Home';

/**
 * Public pages
 */
import Login from '../containers/pages/Login';

/**
 * config admin common
 */
const AdminRouters = [
    { path: config.HomeRoutes.home, component: Home, layout: AdminLayout },
];


/**
 * config public
 */

const PublicRouters = [
    { path: config.PublicRoutes.login, component: Login, layout: PublicLayout },
];
export {AdminRouters, PublicRouters};