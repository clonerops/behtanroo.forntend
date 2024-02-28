import axios from "axios";
import Cookies from "js-cookie";

export const dashboardHttp = axios.create({
    baseURL: "https://nodeapi.behtanroo.com/api/",
    // baseURL: "http://localhost:5000/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
});

export const http = axios.create({
    // baseURL: "http://localhost:5000/api/",
    baseURL: "https://nodeapi.behtanroo.com/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
});
export const httpFormData = axios.create({
    // baseURL: "http://localhost:5000/api/",
    baseURL: "https://nodeapi.behtanroo.com/api/",
    responseType: 'arraybuffer',
    headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
});


