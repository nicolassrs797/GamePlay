import axios from "axios";

let api = axios.create({
    baseURL: 'https://discord.com/api'
});

export { api };