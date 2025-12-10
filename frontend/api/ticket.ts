import api from './index'

type ticketPayload = {
    ticket: {
        title: string,
        description: string,
        status: string | null,
        assigneeID: BigInteger | null,
    }
};

const endpoints = {

    getTickets: async () => {
        return await api('/tickets')
    },

    createTicket: async (payload: ticketPayload) => {
        return await api('/tickets', {
            method: 'post',
            data: payload,
        });
    }
}

export default endpoints;