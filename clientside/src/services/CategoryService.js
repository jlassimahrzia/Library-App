import CookieService from "./CookieService"
import axios from 'axios'
import toast from 'react-hot-toast';
class CategoryService {
    async add(category, submitProps) {
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.post("http://localhost:8000/api/store_category", category, options)
            .then(res => {
                toast.success("Catégorie créée avec succès");
                submitProps.resetForm();
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
    }
    async getAll() {
        const at = CookieService.get("access_token");
        let tab = [];
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.get("http://localhost:8000/api/categories", options)
            .then(res => {
                tab = res.data;
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé");
            });
        return tab
    }
    async update(id, category, submitProps) {
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.put(`http://localhost:8000/api/update_category/${id}`, category, options)
            .then(res => {
                toast.success("Catégorie modifiée avec succès");
                submitProps.resetForm();
            })
            .catch(error => {
                console.log(error);
                toast.error("Quelque chose s'est mal passé")
            });
    }
    async delete(id) {
        const at = CookieService.get("access_token");
        const options = {
            headers: {
                Authorization: "Bearer " + at,
            },
        };
        await axios.delete(`http://localhost:8000/api/delete_category/${id}`, options)
            .then(res => {
                toast.success("Catégorie supprimée avec succès");
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
        await axios.post(`http://localhost:8000/api/search_category`, search, options)
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
export default new CategoryService();