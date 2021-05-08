import { reactLocalStorage } from 'reactjs-localstorage';

class LocalStorageService {
    get(key) {
        return reactLocalStorage.get(key, true);
    }

    set(key, value) {
        reactLocalStorage.set(key, value);
    }

    setObject(key, obj) {
        reactLocalStorage.setObject(key, obj);
    }

    getObject(key) {
        return reactLocalStorage.getObject(key);
    }

    remove(key) {
        reactLocalStorage.remove(key);
    }

    clear() {
        reactLocalStorage.clear();
    }

}

export default new LocalStorageService();