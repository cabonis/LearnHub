import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchCourseAnnouncements = (courseId) => {
    return useQuery({
        queryKey: ["announcements", courseId],
        queryFn: () =>
            axios.get(`/api/announcement/course/${courseId}`)
                .then((resp) => resp.data),
    });
};

const useAddAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (announcement) => axios.post(`/api/announcement`, announcement),
        onSuccess: (_, announcement) => {
            queryClient.invalidateQueries({ queryKey: ["announcements", announcement.courseId] });
        },
    });
};

const useUpdateAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (announcement) => axios.put(`/api/announcement`, announcement),
        onSuccess: (_, announcement) => {
            queryClient.invalidateQueries({ queryKey: ["announcements", announcement.courseId] });
        },
    });
};

const useDeleteAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, courseId }) => axios.delete(`/api/announcement/${id}`),
        onSuccess: (_, courseId) => {
            queryClient.invalidateQueries({ queryKey: ["announcements", courseId] });
        },
    });
};


export { useFetchCourseAnnouncements, useAddAnnouncement, useUpdateAnnouncement, useDeleteAnnouncement }