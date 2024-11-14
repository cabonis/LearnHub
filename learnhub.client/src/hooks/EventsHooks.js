import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchEvents = () => {
    return useQuery({
        queryKey: ["events"],
        queryFn: () =>
            axios.get(`/api/events`)
                .then((resp) => resp.data),
    });
};



export { useFetchEvents }