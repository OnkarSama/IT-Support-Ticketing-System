import axios from 'axios';

import baseUrl from "@/api/baseUrl";

const axiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
})

type ApiOptions = {
    data?: object | string,
    method?: 'get' | 'post' | 'put' | 'delete',
    params?: object,
}

export const api =  async(url: string, options: ApiOptions =  {}) => {
    const {data, method = 'get', params } = options;

    const accessToken = 'ACCESS_TOKEN';

    try {
        const response = await axiosInstance.request({
            data,
            headers : {
                'Authorization' : `Bearer ${accessToken}`,
            },
            method,
            params,
            responseType: 'json',
            url,

        })
        return response.data;
    } catch (error) {
        throw new Error(JSON.stringify(error));
    }
}

export default api;