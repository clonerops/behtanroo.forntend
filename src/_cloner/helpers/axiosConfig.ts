import axios from "axios";
import Cookies from "js-cookie";
import { getRefreshToken } from "./reusableFunction";

export const dashboardHttp = axios.create({
    baseURL: "https://localhost:5000/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
});

export const http = axios.create({
    baseURL: "http://localhost:5000/api/",
    headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Cookies.get("token")}`,
    },
});

