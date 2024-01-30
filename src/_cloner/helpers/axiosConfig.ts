import axios from "axios";
import Cookies from "js-cookie";
import { getRefreshToken } from "./reusableFunction";

export const dashboardHttp = axios.create({
    baseURL: "https://behtanroo.ir/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
});

export const http = axios.create({
    baseURL: "https://behtanroo.ir/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
});

