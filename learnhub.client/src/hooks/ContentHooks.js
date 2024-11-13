import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchContent = () => (id) => {
    open(`/api/content/${id}`);
};

const useFetchModuleContent = (moduleId) => {
    return useQuery({
        queryKey: ["content", moduleId],
        queryFn: () =>
            axios.get(`/api/content/module/${moduleId}`)
                .then((resp) => resp.data),
    });
};

// const useAddModule = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (module) => axios.post(`/api/module`, module),
//         onSuccess: (_, newModule) => {
//             queryClient.invalidateQueries({ queryKey: ["modules", newModule.courseId] });
//         },
//     });
// };

// const useUpdateModule = () => {
//     const queryClient = useQueryClient();
//     return useMutation({
//         mutationFn: (module) => axios.put(`/api/module`, module),
//         onSuccess: (module) => {
//             queryClient.invalidateQueries({ queryKey: ["modules", module.courseId] });
//         },
//     });
// };

const useDeleteContent = () => {
    return useMutation({
        mutationFn: ({ id }) => axios.delete(`/api/content/${id}`)
    });
};


export { useFetchContent, useDeleteContent, useFetchModuleContent }