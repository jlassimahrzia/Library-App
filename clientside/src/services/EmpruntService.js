import CookieService from "./CookieService"
import axios from 'axios'
import toast from 'react-hot-toast';
class EmpruntService {
    async getEmpruntsEnCours() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get("http://localhost:8000/api/emprunt_en_cours", options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }
    async getEmpruntsEnRetards() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get("http://localhost:8000/api/emprunt_en_retard", options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }
    async getEmpruntsEnArchives() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get("http://localhost:8000/api/emprunt_en_archive", options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }
    async add(values, submitProps) {
        const at = CookieService.get("access_token");
        let test = false;
        const options = {
            headers: {
                Authorization: "Bearer " + at
            },
        };
        await axios.post("http://localhost:8000/api/store_emprunt", values, options)
            .then(res => {
                test = res.data.test;
                if (!res.data.test) {
                    let error = ""
                    res.data.errors.forEach(element => {
                        error += "\n" + element
                    });
                    toast.error(error)
                } else {
                    toast.success("Emprunt créée avec succès");
                    submitProps.resetForm();
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return test;
    }
    async setRendu(id) {
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post("http://localhost:8000/api/set_rendu", { id: id }, options)
            .then(res => {
                toast.success("Emprunt terminée avec succée");
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
    }
    async delete(id) {
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.delete(`http://localhost:8000/api/delete_emprunt/${id}`, options)
            .then(res => {
                toast.success("Emprunt annuler");
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
    }

    async update(id, values, submitProps) {
        const at = CookieService.get("access_token");
        let test = false;
        const options = {
            headers: {
                Authorization: "Bearer " + at
            },
        };
        await axios.put(`http://localhost:8000/api/update_emprunt/${id}`, values, options)
            .then(res => {
                test = res.data.test;
                if (!res.data.test) {
                    let error = ""
                    res.data.errors.forEach(element => {
                        error += "\n" + element
                    });
                    toast.error(error)
                } else {
                    toast.success("Emprunt modifiée avec succès");
                    submitProps.resetForm();
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return test;
    }
}
export default new EmpruntService();