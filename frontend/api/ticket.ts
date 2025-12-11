import api from './index'

type ticketPayload = {
    ticket: {
        title: string,
        description: string,
        status: string,
        assigneeID: number | null,
    }
};

const endpoints = {

    getTickets: async () => {
        return await api('/tickets')
    },

    getTicketById: async (id: number) => {
        return await api(`/api/tickets/${id}`)
    },

    createTicket: async (payload: ticketPayload) => {
        return await api('/tickets', {
            method: 'post',
            data: payload,   // ← FIXED
        });
    },

    updateTicket: async (id: number, payload: ticketPayload) => {
        return await api(`/api/tickets/${id}`, {
            method: 'patch',
            data: payload,

        })
    }

}

export default endpoints;