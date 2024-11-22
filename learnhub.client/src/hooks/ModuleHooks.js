import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchCourseModules = (courseId) => {
    return useQuery({
        queryKey: ["modules", courseId],
        queryFn: () =>
            axios.get(`/api/module/course/${courseId}`)
                .then((resp) => resp.data),
    });
};

const useFetchModule = (moduleId) => {
    return useQuery({
        queryKey: ["moduledetail", moduleId],
        queryFn: () =>
            axios.get(`/api/module/${moduleId}`)
                .then((resp) => resp.data),
    });
};

const useFetchAdminCourseModules = (courseId) => {
    return useQuery({
        queryKey: ["modules", courseId],
        queryFn: () =>
            axios.get(`/api/module/admin/course/${courseId}`)
                .then((resp) => resp.data),
    });
};

const useFetchAdminModule = (id) => {
    return useQuery({
        queryKey: ["module", id],
        queryFn: () =>
            axios.get(`/api/module/admin/${id}`)
                .then((resp) => resp.data),
    });
};

const useAddAdminModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (module) => axios.post(`/api/module/admin`, module),
        onSuccess: (_, newModule) => {
            queryClient.invalidateQueries({ queryKey: ["modules", newModule.courseId] });
        },
    });
};

const useUpdateAdminModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (module) => axios.put(`/api/module/admin`, module),
        onSuccess: (module) => {
            queryClient.invalidateQueries({ queryKey: ["modules", module.courseId] });
        },
    });
};

const useDeleteAdminModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, courseId }) => axios.delete(`/api/module/admin/${id}`),
        onSuccess: (_, courseId) => {
            queryClient.invalidateQueries({ queryKey: ["modules", courseId] });
        },
    });
};


export {
    useFetchCourseModules,
    useFetchModule,
    useFetchAdminCourseModules,
    useFetchAdminModule,
    useAddAdminModule,
    useUpdateAdminModule,
    useDeleteAdminModule
}