import Index from "views/Index.jsx";
import Register from "views/auth/Register.jsx";
import Login from "views/auth/Login.jsx";
import Ouvrage from "views/admin/Ouvrage";
import Category from "views/admin/Category"
import User from "views/admin/User"
//import Tables from "views/examples/Tables.jsx";
//import Icons from "views/examples/Icons.jsx";
//import Profile from "views/examples/Profile.jsx";
/* import Maps from "views/examples/Maps.jsx"; */
var routes = [
    /** Auth Routes */
    {
        path: "/login",
        name: "Login",
        icon: "ni ni-key-25 text-info",
        component: Login,
        layout: "/auth",
    },
    {
        path: "/register",
        name: "Register",
        icon: "ni ni-circle-08 text-pink",
        component: Register,
        layout: "/auth",
    },
    /** Admin Routes */
    {
        path: "/index",
        name: "Tableau de bord",
        icon: "ni ni-tv-2 text-info",
        component: Index,
        layout: "/admin",
    },
    {
        path: "/categories",
        name: "Categories",
        icon: "ni ni-collection text-info",
        component: Category,
        layout: "/admin",
    },
    {
        path: "/ouvrages",
        name: "Ouvrages",
        icon: "ni ni-books text-info",
        component: Ouvrage,
        layout: "/admin",
    },
    {
        path: "/user",
        name: "Emprunteurs",
        icon: "ni ni-circle-08 text-info",
        component: User,
        layout: "/admin",
    }
    /* {
        path: "/icons",
        name: "Icons",
        icon: "ni ni-planet text-blue",
        component: Icons,
        layout: "/admin",
    }, */
    /* {
        path: "/maps",
        name: "Maps",
        icon: "ni ni-pin-3 text-orange",
        component: Maps,
        layout: "/admin",
    }, */
    /* {
        path: "/user-profile",
        name: "User Profile",
        icon: "ni ni-single-02 text-yellow",
        component: Profile,
        layout: "/admin",
    }, */
    /* {
        path: "/tables",
        name: "Tables",
        icon: "ni ni-bullet-list-67 text-red",
        component: Tables,
        layout: "/admin",
    }, */

];
export default routes;