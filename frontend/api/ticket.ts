import api from './index'

const endpoints = {

    getTickets: async () => {
        return await api('tickets')
    }
}

export default endpoints;