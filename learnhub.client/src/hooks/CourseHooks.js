import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const useFetchCourses = () => {
    return useQuery({
        queryKey: ["course"],
        queryFn: () =>
            axios.get(`/api/course`)
                .then((resp) => resp.data),
    });
};

const useAddCourse = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation({
        mutationFn: (course) => axios.post(`/api/course`, course),
        onSuccess: (_, course) => {
            queryClient.invalidateQueries({ queryKey: ["course"] });
            nav(`/admin/course/${course.id}`);
        },
    });
};

const useUpdateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (course) => axios.put(`/api/course`, course),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course"] });
        },
    });
};

const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => axios.delete(`/api/course/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["course"] });
        },
    });
};


export { useFetchCourses, useAddCourse, useUpdateCourse, useDeleteCourse }