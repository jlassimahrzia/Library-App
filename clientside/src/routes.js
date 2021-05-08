// Auth Components
import Register from "views/auth/Register.jsx";
import Login from "views/auth/Login.jsx";
// Admin Components
import Ouvrage from "views/admin/Ouvrage";
import Category from "views/admin/Category";
import User from "views/admin/User";
import Index from "views/Index.jsx";
import EmpruntsEnCours from "views/admin/emprunts/EmpruntsEnCours"
import EmpruntsEnRetards from "views/admin/emprunts/EmpruntsEnRetards"
import EmpruntsEnArchive from "views/admin/emprunts/EmpruntsEnArchive"
// User Components
import Home from "views/user/home/Home"
import About from "views/user/About"
import Contact from "views/user/Contact"
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
    },
    /* Admin Emprunts Routes */
    {
        path: "/emprunts_en_cours",
        name: "Liste des emprunts en cours",
        icon: "ni ni-bullet-list-67 text-info",
        component: EmpruntsEnCours,
        layout: "/admin/emprunts",
    },
    {
        path: "/emprunts_en_retards",
        name: "Liste des emprunts en retards",
        icon: "ni ni-time-alarm text-info",
        component: EmpruntsEnRetards,
        layout: "/admin/emprunts",
    },
    {
        path: "/emprunts_en_archives",
        name: "Liste des emprunts en archives",
        icon: "ni ni-archive-2 text-info",
        component: EmpruntsEnArchive,
        layout: "/admin/emprunts",
    },
    /* User routes */
    {
        path: "/index",
        name: "Home",
        component: Home,
        layout: "/user",
    },
    {
        path: "/about",
        name: "A propos",
        component: About,
        layout: "/user",
    },
    {
        path: "/contact",
        name: "Contact",
        component: Contact,
        layout: "/user",
    }

];
export default routes;