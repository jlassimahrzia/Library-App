import CookieService from "./CookieService"
import axios from 'axios'
import toast from 'react-hot-toast';
class UserService {
    async getExternUser() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get("http://localhost:8000/api/extern_users", options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }

    async getInternUser() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get("http://localhost:8000/api/intern_users", options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }

    async add(values, photo, submitProps) {
        const at = CookieService.get("access_token");
        let test = false;
        const options = {
            headers: {
                Authorization: "Bearer " + at
            },
        };
        if (photo !== '') {
            values.photo = photo;
        }
        values.password = values.cin + "@" + values.numCarte;
        values.type = '1';
        console.log(values);

        await axios.post("http://localhost:8000/api/store_user", values, options)
            .then(res => {
                test = res.data.test;
                if (!res.data.test) {
                    let error = ""
                    res.data.errors.forEach(element => {
                        error += "\n" + element
                    });
                    toast.error(error)
                } else {
                    toast.success("Emprunteur créée avec succès");
                    submitProps.resetForm();
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return test;
    }
    async update(id, values, photo, submitProps) {
        const at = CookieService.get("access_token");
        let test = false;
        const options = {
            headers: {
                Authorization: "Bearer " + at
            },
        };
        if (photo !== '') {
            values.photo = photo;
        }

        await axios.put(`http://localhost:8000/api/update_user/${id}`, values, options)
            .then(res => {
                test = res.data.test;
                if (!res.data.test) {
                    let error = ""
                    res.data.errors.forEach(element => {
                        error += "\n" + element
                    });
                    toast.error(error)
                } else {
                    toast.success("Emprunteur créée avec succès");
                    submitProps.resetForm();
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return test;
    }
    async delete(id) {
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.delete(`http://localhost:8000/api/delete_user/${id}`, options)
            .then(res => {
                toast.success("Emprunteur supprimé avec succès");
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
    }
    async search(search) {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post(`http://localhost:8000/api/search_user`, search, options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return tab
    }
}
export default new UserService();