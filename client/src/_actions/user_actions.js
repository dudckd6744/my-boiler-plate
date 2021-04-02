import axios from "axios";
import {
    REGISTER_USER,
    LOGIN_USER,
    AUTH_USER
} from "./types";
import { USER_SERVER } from "../components/Config";


export function registerUser(body){
    const request = axios.post(`${USER_SERVER}/register`,body)
    .then(response => response.data);

    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(body){
    const request = axios.post(`${USER_SERVER}/login`,body)
    .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}