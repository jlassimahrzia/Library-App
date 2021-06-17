import CookieService from "./CookieService"
import axios from 'axios'
import toast from 'react-hot-toast';

class OuvrageService {
    async getAll() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get("http://localhost:8000/api/ourages", options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }

    async upload_pdf(data) {
        const at = CookieService.get("access_token");
        let name = "";
        const options = {
            headers: {
                Authorization: "Bearer " + at,
                "Content-Type": "multipart/form-data",
            },
        };
        await axios.post("http://localhost:8000/api/upload_pdf", data, options)
            .then(res => {
                name = res.data
            })
            .catch(error => {
                console.log(error);
            });
        return name;
    }
    async add(values, photo, data, submitProps) {
        const at = CookieService.get("access_token");
        let test = false;
        const options = {
            headers: {
                Authorization: "Bearer " + at
            },
        };
        if (photo !== '') {
            values.photoCouverture = photo;
        }
        if (data !== '') {
            values.pdfVersion = await this.upload_pdf(data);
        }
        await axios.post("http://localhost:8000/api/store_ourage", values, options)
            .then(res => {
                test = res.data.test;
                if (!res.data.test) {
                    let error = ""
                    res.data.errors.forEach(element => {
                        error += "\n" + element
                    });
                    toast.error(error)
                } else {
                    toast.success("Ouvrage créée avec succès");
                    submitProps.resetForm();
                }
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return test;
    }
    async update(id, values, photo, data, submitProps) {
        const at = CookieService.get("access_token");
        let test = false;
        const options = {
            headers: {
                Authorization: "Bearer " + at
            },
        };
        if (photo !== '') {
            values.photoCouverture = photo;
        }
        if (data !== '') {
            values.pdfVersion = await this.upload_pdf(data);
        }
        await axios.put(`http://localhost:8000/api/update_ouvrage/${id}`, values, options)
            .then(res => {
                test = res.data.test;
                if (!res.data.test) {
                    let error = ""
                    res.data.errors.forEach(element => {
                        error += "\n" + element
                    });
                    toast.error(error)
                } else {
                    toast.success("Ouvrage mis à jour avec succès");
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
        await axios.delete(`http://localhost:8000/api/delete_ouvrage/${id}`, options)
            .then(res => {
                toast.success("Ouvrage supprimé avec succès");
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
        await axios.post(`http://localhost:8000/api/search_ouvrage`, search, options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
        return tab
    }
    async store_stars(rating) {
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post(`http://localhost:8000/api/store_rating`, rating, options)
            .then(res => {
                toast.success("Merci de donner votre avis")
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
    }

    async top_rated() {
        let tab = [];
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get(`http://localhost:8000/api/bestRate`, options)
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
export default new OuvrageService();