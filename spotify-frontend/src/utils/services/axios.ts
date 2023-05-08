import axios from "axios";

export const createInstance = (access_token: string) => {
    const instance = axios.create({
        baseURL: "https://api.spotify.com/v1",
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    });
    return instance;
}

export const createLocalInstance = (access_token: string) => {
    const instance = axios.create({
        baseURL: "http://127.0.0.1:8000/api",
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    });
    return instance;
}