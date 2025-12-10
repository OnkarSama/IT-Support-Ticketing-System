import axios from 'axios';
import baseUrl from "@/api/baseUrl";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    withCredentials: true,
});

type ApiOptions = {
    data?: object | string,
    method?: 'get' | 'post' | 'put' | 'delete',
    params?: object,
}

export const api = async (url: string, options: ApiOptions = {}) => {
    const { data, method = 'get', params } = options;

    const cookieString = document._my_app_session;

    console.log(cookieString);

    try {
        const response = await axiosInstance.request({
            url,
            method,
            data,
            params,
            responseType: 'json',
            headers: {
                'Cookie': cookieString,    // ← attach manually
            },
        });

        return response.data;

    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
};


export default api;
