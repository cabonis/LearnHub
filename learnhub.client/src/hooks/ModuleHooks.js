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

const useFetchModule = (id) => {
    return useQuery({
        queryKey: ["module", id],
        queryFn: () =>
            axios.get(`/api/module/${id}`)
                .then((resp) => resp.data),
    });
};

const useAddModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (module) => axios.post(`/api/module`, module),
        onSuccess: (_, newModule) => {
            queryClient.invalidateQueries({ queryKey: ["modules", newModule.courseId] });
        },
    });
};

const useUpdateModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (module) => axios.put(`/api/module`, module),
        onSuccess: (module) => {
            queryClient.invalidateQueries({ queryKey: ["modules", module.courseId] });
        },
    });
};

const useDeleteModule = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, courseId }) => axios.delete(`/api/module/${id}`),
        onSuccess: (_, courseId) => {
            queryClient.invalidateQueries({ queryKey: ["modules", courseId] });
        },
    });
};


export { useFetchCourseModules, useFetchModule, useAddModule, useUpdateModule, useDeleteModule }