import api from './index'


type LoginPayload = {
    email: string,
    password: string
};

const endpoints = {
    createSession: async (payload: LoginPayload) => {
        return await api('/session', {
            method: 'post',
            data: payload,
        });
    }
};

export default endpoints;