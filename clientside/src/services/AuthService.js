import CookieService from "./CookieService"
import axios from 'axios'
import toast from 'react-hot-toast';
import LocalStorageService from "./LocalStorageService"
class AuthService {

    async handleLoginSuccess(response, remember) {
        if (!remember) {
            const options = { path: "/" };
            CookieService.set("access_token", response.data.access_token, options);
            return true;
        }
        const expiresAt = 60 * 24;
        let date = new Date();
        date.setTime(date.getTime() + expiresAt * 60 * 1000);
        const options = { path: "/", expires: date };
        CookieService.set("access_token", response.data.access_token, options);
        return true;
    }
    async login(values, isChecked) {
        let user = {};
        await axios.post("http://localhost:8000/api/login", values)
            .then(res => {
                console.log(res);
                console.log("success");
                this.handleLoginSuccess(res, isChecked);
            })
            .catch(error => {
                console.log(error);
                console.log("fail");
                toast.error("Veuillez vérifier vos informations d'identification et réessayer");
            });
        user = await this.user();
        LocalStorageService.setObject('user', user);
        return user.type;
    }
    async user() {
        const at = CookieService.get("access_token");
        let user = {};
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get(`http://localhost:8000/api/user`, options)
            .then(res => {
                user = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return user;
    }

    async logout(event) {
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post("http://localhost:8000/api/logout", null, options)
            .then(res => {
                CookieService.remove("access_token");
                LocalStorageService.remove("user");
            })
            .catch(error => {
                toast.error("Quelque chose s'est mal passé")
            });
    }

    async Register(user) {
        axios.post("http://localhost:8000/api/register", user)
            .then(res => {
                toast.success("Utilisateur créer avec succée vous pouvez connecter maintenant");
            })
            .catch(error => {
                toast.error("Quelque chose s'est mal passé")
            });
    }
}
export default new AuthService();