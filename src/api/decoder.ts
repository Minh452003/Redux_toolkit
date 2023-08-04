import jwt_decode from "jwt-decode";

const accessToken = JSON.parse(localStorage.getItem('accessToken') || '');
export const decoded: any = jwt_decode(accessToken);
