import CookieService from "./CookieService"
import axios from 'axios'
import toast from 'react-hot-toast';
import LocalStorageService from "services/LocalStorageService"
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
    async getEmpruntsEnLigne() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get("http://localhost:8000/api/emprunt_en_ligne", options)
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
                        /*res.data.errors.forEach(element => {
                            error += "\n" + element
                        });
                        toast.error(error)*/
                    console.log(res)
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

    // By User
    async getEmpruntsEnCoursByUser() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        const user = LocalStorageService.getObject('user');
        await axios.get(`http://localhost:8000/api/empruntEnCours/${user.id}`, options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }
    async getEmpruntsEnRetardsByUser() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        const user = LocalStorageService.getObject('user');
        await axios.get(`http://localhost:8000/api/empruntEnRetards/${user.id}`, options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }
    async getEmpruntsEnArchivesByUser() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        const user = LocalStorageService.getObject('user');
        await axios.get(`http://localhost:8000/api/empruntEnArchives/${user.id}`, options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }
    async reserver(values, submitProps) {
        const at = CookieService.get("access_token");
        let test = false;
        const options = {
            headers: {
                Authorization: "Bearer " + at
            },
        };
        const user = LocalStorageService.getObject('user');
        const emprunt = { user_id: user.id, ...values };
        await axios.post("http://localhost:8000/api/reservation", emprunt, options)
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
    async searchEnCours(search) {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post(`http://localhost:8000/api/searchEnCours_emprunt`, search, options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return tab
    }
    async searchEnRetards(search) {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post(`http://localhost:8000/api/searchEnRetards_emprunt`, search, options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return tab
    }
    async searchEnArchive(search) {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post(`http://localhost:8000/api/searchEnArchive_emprunt`, search, options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return tab
    }
    async searchEnLigne(search) {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post(`http://localhost:8000/api/searchEnLigne_emprunt`, search, options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return tab
    }
    async setValider(id) {
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post("http://localhost:8000/api/valider", { id: id }, options)
            .then(res => {
                toast.success("Emprunt validée avec succée");
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
    }
}
export default new EmpruntService();