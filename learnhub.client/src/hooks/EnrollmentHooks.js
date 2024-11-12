import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchCourseEnrollment = (courseId) => {
    return useQuery({
        queryKey: ["enrollment", courseId],
        queryFn: () =>
            axios.get(`/api/enrollment/${courseId}`)
                .then((resp) => resp.data),
    });
};

const useUpdateCourseEnrollment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (enrollment) => axios.put(`/api/enrollment`, enrollment),
        onSuccess: (_, { courseId }) => {
            queryClient.invalidateQueries({ queryKey: ["enrollment", courseId] });
        },
    });
};


export { useFetchCourseEnrollment, useUpdateCourseEnrollment }