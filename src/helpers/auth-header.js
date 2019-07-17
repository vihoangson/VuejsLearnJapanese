import { AppConst } from '../common/AppConst';
export function authHeader() {
    let user = JSON.parse(localStorage.getItem(AppConst.LOCAL_USER));
    if (user && user.token) {
        return 'Bearer ' + user.token;
    } else {
        return '';
    }
}
