import axios from "axios";

const ENV = process.env.REACT_APP_ENV.trim() || "development";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

console.log(`Running in ${ENV} mode`);

let api;

if (ENV === 'local'){
    api = {
        get: async (url) => {
            if (url !== ""){
                const mockData = require(`../mocks/data${url}.json`);
                return { data: mockData };
            }            
            return {data: []}
        },
        post: async (url, payload) => {
            console.log(`POST ${url}`, payload);
            return { message: "Created successfully", data: payload };
        },
        put: async (url, payload) => {
            console.log(`PUT ${url}`, payload);
            return { message: "Updated successfully", data: payload };
        },
        delete: async (url) => {
            console.log(`DELETE ${url}`);
            return { message: "Deleted successfully" };
        }
    }
} else {
    api = axios.create({
        baseURL: API_BASE_URL,
        timeout: 10000,
        headers: {"Content-Type": "application/json"}
    })
}

export { api };