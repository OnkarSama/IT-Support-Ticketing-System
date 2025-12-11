// "use client";
//
// import { useEffect, useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
//
// import apiRouter from "@/api/router";
//
// interface TicketPageProps {
//     params: { id: number };
// }
//
// // shape of the form
// const defaultState = {
//     title: "",
//     description: "",
//     status: "",
//     requester: "",
// };
//
// export default function EditTicketPage({ params }: TicketPageProps) {
//     const ticketId = Number(params.id);
//
//     const [state, setState] = useState(defaultState);
//     const { title, description, status, requester } = state;
//
//     const queryClient = useQueryClient();
//
//     // GET THE TICKET
//     const { data, isLoading, refetch, status } = useQuery({
//         queryKey: ['getTicketByID', params.id],
//         queryFn: () => apiRouter.tickets.getTicketById(params.id),
//     })
//
//     // UPDATE MUTATION
//     const updateMutation = useMutation({
//         mutationFn: async ({ params.id, payload }) => {
//             return apiRouter.tickets.updateTicket(params.id, data);
//         },
//         onSuccess: () => {
//             queryClient.invalidateQueries({ queryKey: ["getTickets"] });
//             refetch(); // refresh this ticket
//         },
//     });
//
//
//     // Sync query data → form
//     useEffect(() => {
//         if (queryStatus === "success" && ticketData) {
//             setState({
//                 title: ticketData.title || "",
//                 description: ticketData.description || "",
//                 status: ticketData.status || "",
//                 requester: ticketData.requester || "",
//             });
//         }
//     }, [queryStatus]);
//
//     if (isLoading) {
//         return (
//             <div className="p-6">
//                 <h1 className="text-2xl font-bold">Loading Ticket...</h1>
//             </div>
//         );
//     }
//
//     if (!ticketData) {
//         return (
//             <div className="p-6">
//                 <h1 className="text-2xl font-bold">Ticket Not Found</h1>
//             </div>
//         );
//     }
//
//     return (
//         <main className="p-6 space-y-4 max-w-xl mx-auto">
//             <h1 className="text-3xl font-bold">Edit Ticket #{ticketId}</h1>
//
//             <form className="flex flex-col gap-4 bg-gray-900 p-6 rounded-xl">
//                 <div className="flex flex-col">
//                     <label className="font-semibold">Title</label>
//                     <input
//                         className="p-2 rounded bg-gray-800"
//                         type="text"
//                         value={title}
//                         onChange={(e) =>
//                             setState((p) => ({ ...p, title: e.target.value }))
//                         }
//                     />
//                 </div>
//
//                 <div className="flex flex-col">
//                     <label className="font-semibold">Description</label>
//                     <textarea
//                         className="p-2 rounded bg-gray-800 h-24"
//                         value={description}
//                         onChange={(e) =>
//                             setState((p) => ({ ...p, description: e.target.value }))
//                         }
//                     />
//                 </div>
//
//                 <div className="flex flex-col">
//                     <label className="font-semibold">Status</label>
//                     <input
//                         className="p-2 rounded bg-gray-800"
//                         type="text"
//                         value={status}
//                         onChange={(e) =>
//                             setState((p) => ({ ...p, status: e.target.value }))
//                         }
//                     />
//                 </div>
//
//                 <div className="flex flex-col">
//                     <label className="font-semibold">Requester</label>
//                     <input
//                         className="p-2 rounded bg-gray-800"
//                         type="text"
//                         value={requester}
//                         onChange={(e) =>
//                             setState((p) => ({ ...p, requester: e.target.value }))
//                         }
//                     />
//                 </div>
//
//                 <button
//                     className="bg-purple-600 hover:bg-purple-700 transition p-2 rounded text-white font-bold"
//                     onClick={(e) => {
//                         e.preventDefault();
//
//                         updateMutation.mutate({
//                             id: ticketId,
//                             payload: {
//                                 title,
//                                 description,
//                                 status,
//                                 requester,
//                             },
//                         });
//
//                     }}
//                 >
//                     Save Changes
//                 </button>
//             </form>
//         </main>
//     );
// }
