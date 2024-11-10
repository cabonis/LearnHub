import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useFetchUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: () =>
            axios.get(`/api/user/all`)
                .then((resp) => resp.data),
    });
};

// const useAddCourse = () => {
//     const queryClient = useQueryClient();
//     const nav = useNavigate();
//     return useMutation({
//         mutationFn: (course) => axios.post(`/api/course`, course),
//         onSuccess: (_, course) => {
//             queryClient.invalidateQueries({ queryKey: ["course"] });
//             //nav(`/admin/course/${course.id}`);
//             nav(`/admin/course/`);
//         },
//     });
// };

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


export { useFetchUsers, useUpdateUserRole, useDeleteUser }