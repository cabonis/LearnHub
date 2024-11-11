import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () =>
            axios.get(`/api/user/all`)
                .then((resp) => resp.data),
    });
};

const useFetchUsersByRole = (role) => {
    return useQuery({
        queryKey: ["users", role],
        queryFn: () =>
            axios.get(`/api/user/role/${role}`)
                .then((resp) => resp.data),
    });
};

const useUpdateUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (user) => axios.put(`/api/user`, user),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};

const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => axios.delete(`/api/user/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
    });
};


export { useFetchUsers, useFetchUsersByRole, useUpdateUserRole, useDeleteUser }