import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchContent = () => (id) => {
    open(`/api/content/${id}`);
};

const useAddContent = () => {
    return useMutation({
        mutationFn: (contentForm) => axios.post(`/api/content`, contentForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    });
};

const useFetchModuleContent = (moduleId) => {
    return useQuery({
        queryKey: ["content", moduleId],
        queryFn: () =>
            axios.get(`/api/content/module/${moduleId}`)
                .then((resp) => resp.data),
    });
};

const useUpdateContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (content) => axios.put(`/api/content`, content),
        onSuccess: (content) => {
            queryClient.invalidateQueries({ queryKey: ["content", content.moduleId] });
        },
    });
};

const useDeleteContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id, moduleId) => axios.delete(`/api/content/${id}`),
        onSuccess: (_, moduleId) => {
            queryClient.invalidateQueries({ queryKey: ["content", moduleId] });
        },
    });
};


export { useFetchModuleContent, useFetchContent, useAddContent, useUpdateContent, useDeleteContent }