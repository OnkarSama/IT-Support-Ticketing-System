import api from './index'

export type User = {

    id: number,
    name: string,
    email: string,
    role: string,
    tickets_assgined: {
        id: number,
        title: string,
        description: string
    }
};

const endpoints = {

    showUsers: async () => {
        return await api('/users', {
            method: 'get'
        })
    }

};

export default endpoints;