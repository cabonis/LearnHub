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

const useFetchCourseDetail = (id) => {
    return useQuery({
        queryKey: ["course-detail", id],
        queryFn: () =>
            axios.get(`/api/course/${id}`)
                .then((resp) => resp.data),
        retry: false
    });
};

const useFetchAdminCourses = () => {
    return useQuery({
        queryKey: ["courses"],
        queryFn: () =>
            axios.get(`/api/course/admin`)
                .then((resp) => resp.data),
    });
};

const useFetchAdminCourseInfo = (id) => {
    return useQuery({
        queryKey: ["course", id],
        queryFn: () =>
            axios.get(`/api/course/admin/${id}`)
                .then((resp) => resp.data),
    });
};

const useAddAdminCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (course) => axios.post(`/api/course/admin`, course),
        onSuccess: (_, course) => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
    });
};

const useUpdateAdminCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (course) => axios.put(`/api/course/admin`, course),
        onSuccess: (course) => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
            queryClient.invalidateQueries({ queryKey: ["course", course.id] });
            queryClient.invalidateQueries({ queryKey: ["course-detail", course.id] });
        },
    });
};

const useDeleteAdminCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => axios.delete(`/api/course/admin/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
    });
};


export {
    useFetchCourses,
    useFetchAdminCourses,
    useFetchAdminCourseInfo,
    useFetchCourseDetail,
    useAddAdminCourse,
    useUpdateAdminCourse,
    useDeleteAdminCourse
}