import axios from 'axios'

export const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {

    // const accessToken = JSON.parse(localStorage.getItem('accessToken')!) || [];
    // // Nếu có token, thêm vào header của request
    // if (accessToken) {
    //     config.headers['Authorization'] = `Bearer ${accessToken}`;
    // }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});