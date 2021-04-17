import Cookie from "universal-cookie";

const cookie = new Cookie();

class CookieService {
    get(key) {
        return cookie.get(key);
    }

    set(key, value, options) {
        cookie.set(key, value, options);
    }

    remove(key: String) {
        cookie.remove(key, { path: '/', domain: 'localhost' });
    }
}

export default new CookieService();