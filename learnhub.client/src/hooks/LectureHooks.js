import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


const useFetchAdminModuleLectures = (moduleId) => {
    return useQuery({
        queryKey: ["lectures", moduleId],
        queryFn: () =>
            axios.get(`/api/lectures/admin/module/${moduleId}`)
                .then((resp) => resp.data),
    });
};

const useAddAdminLecture = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (lecture) => axios.post(`/api/lectures/admin`, lecture),
        onSuccess: (_, newLecture) => {
            queryClient.invalidateQueries({ queryKey: ["lectures", newLecture.moduleId] });
        },
    });
};

const useUpdateAdminLecture = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (lecture) => axios.put(`/api/lectures/admin`, lecture),
        onSuccess: (lecture) => {
            queryClient.invalidateQueries({ queryKey: ["lectures", lecture.moduleId] });
        },
    });
};

const useDeleteAdminLecture = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, moduleId }) => axios.delete(`/api/lectures/admin/${id}`),
        onSuccess: (_, moduleId) => {
            queryClient.invalidateQueries({ queryKey: ["lectures", moduleId] });
        },
    });
};


export {
    useFetchAdminModuleLectures,
    useAddAdminLecture,
    useUpdateAdminLecture,
    useDeleteAdminLecture
}