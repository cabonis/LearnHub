import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useFetchCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: () =>
            axios.get(`/api/course`)
                .then((resp) => resp.data),
    });
};

const useFetchCourseInfo = (id) => {
    return useQuery({
        queryKey: ["course", id],
        queryFn: () =>
            axios.get(`/api/course/${id}`)
                .then((resp) => resp.data),
    });
};

const useAddCourse = () => {
    const queryClient = useQueryClient();
    const nav = useNavigate();
    return useMutation({
        mutationFn: (course) => axios.post(`/api/course`, course),
        onSuccess: (_, course) => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
    });
};

const useUpdateCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (course) => axios.put(`/api/course`, course),
        onSuccess: (course) => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
            queryClient.invalidateQueries({ queryKey: ["course", course.id] });
        },
    });
};

const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => axios.delete(`/api/coursexxx/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
    });
};


export { useFetchCourses, useFetchCourseInfo, useAddCourse, useUpdateCourse, useDeleteCourse }