import { intersection } from 'lodash';
import Roles from './Roles';
export function isArrayWithLength(arr) {
    return (Array.isArray(arr) && arr.length)
}

export function getAllowedRoutes(routes) {
    const roles = [
        Roles.CUSTOMER
    ];
    return routes.filter(({ permission }) => {
        if (!permission) return true;
        else if (!isArrayWithLength(permission)) return true;
        else return intersection(permission, roles).length;
    });
}