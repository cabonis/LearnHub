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

const useFetchAdminContent = () => (id) => {
    open(`/api/content/admin/${id}`);
};

const useFetchAdminModuleContent = (moduleId) => {
    return useQuery({
        queryKey: ["content", moduleId],
        queryFn: () =>
            axios.get(`/api/content/admin/module/${moduleId}`)
                .then((resp) => resp.data),
    });
};

const useAddAdminContent = () => {
    return useMutation({
        mutationFn: (contentForm) => axios.post(`/api/content/admin`, contentForm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    });
};

const useUpdateAdminContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (content) => axios.put(`/api/content/admin`, content),
        onSuccess: (content) => {
            queryClient.invalidateQueries({ queryKey: ["content", content.moduleId] });
        },
    });
};

const useDeleteAdminContent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id, moduleId) => axios.delete(`/api/content/admin/${id}`),
        onSuccess: (_, moduleId) => {
            queryClient.invalidateQueries({ queryKey: ["content", moduleId] });
        },
    });
};


export {
    useFetchContent,
    useFetchModuleContent,
    useFetchAdminContent,
    useFetchAdminModuleContent,
    useAddAdminContent,
    useUpdateAdminContent,
    useDeleteAdminContent
}