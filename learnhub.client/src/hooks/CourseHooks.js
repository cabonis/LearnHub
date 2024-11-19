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

const useFetchCourseDetail = (id) => {
    return useQuery({
        queryKey: ["course-detail", id],
        queryFn: () =>
            axios.get(`/api/course/${id}/detail`)
                .then((resp) => resp.data),
    });
};

const useAddCourse = () => {
    const queryClient = useQueryClient();
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
            queryClient.invalidateQueries({ queryKey: ["course-detail", course.id] });
        },
    });
};

const useDeleteCourse = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => axios.delete(`/api/course/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
    });
};


export { useFetchCourses, useFetchCourseInfo, useFetchCourseDetail, useAddCourse, useUpdateCourse, useDeleteCourse }