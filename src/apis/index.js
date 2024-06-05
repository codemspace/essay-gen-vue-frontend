import axios, {AxiosHeaders} from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_SERVER_URL
});

const prefix = '/api/v1';

API.interceptors.request.use((config) => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            const mHeaders = AxiosHeaders.from({
                Authorization: `Bearer ${token}`,
            });

            if (mHeaders) {
                config.headers = mHeaders;
            }
        }
    } catch (error) { }

    return config;
})

API.interceptors.response.use(
    (response) => {
        return response.data;
    },
    async (error) => {
        try {
            if (error.response.status === 401) {
                // store.dispatch(signOutSuccess());
                // if (window.location.pathname.includes("/admin")) {
                //     window.location.href = "/admin";
                // } else {
                //     window.location.href = "/";
                // }
            } else {
                return Promise.reject(error);
            }
        } catch (e) {
            console.log(error);
        }
    }
);

// Auth
const signup = (data) => API.post(`${prefix}/auth/signup`, data);
const signin = (data) => API.post(`${prefix}/auth/signin`, data);
const getAuth = () => API.get(`${prefix}/auth/current-user`);
const googleAuth = (data) => API.post(`${prefix}/auth/google`, data);

// Essays
const GenerateEssay = (data) => API.post(`${prefix}/essays/generate`, data);
const fetchDocument = (data) => API.get(`${prefix}/documents/${data.id}?index=${data.index}`, data);

const fetchDocuments = () => API.get(`${prefix}/documents`);

const fetchFullEssay = (id) => API.get(`${prefix}/documents/${id}`);
const deleteOne = (id) => API.delete(`${prefix}/documents/${id}`);

// Subscriptions
const checkout = (data) => API.post(`${prefix}/subscriptions/create-checkout-session`, data);
const checkoutSuccess = (data) => API.post(`${prefix}/subscriptions/success`, data);

export const apis = {
    GenerateEssay, signup, signin, getAuth, googleAuth, checkout, checkoutSuccess, fetchDocument, fetchDocuments, fetchFullEssay, deleteOne
}