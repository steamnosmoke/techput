import axios from "axios";
import type { TOrder } from "../../../../../app/types/order";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const sendOrder = async (data: TOrder) => {
    const url = "https://69a5a354885dcb6bd6a8d8bc.mockapi.io/orders";
    const send = await axios.post(url, data)
    return send
}

export default function useSendOrder() {
     const queryClient = useQueryClient();
     return useMutation({
       mutationFn: (data: TOrder) => sendOrder(data),
       mutationKey: ["orders"],
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["orders"] });
       },
     });
}