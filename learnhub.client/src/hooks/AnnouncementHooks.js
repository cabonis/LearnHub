import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFetchAnnouncements = () => {
    return useQuery({
        queryKey: ["announcements"],
        queryFn: () =>
            axios.get(`/api/announcement/`)
                .then((resp) => resp.data),
    });
};

const useFetchCourseAnnouncements = (courseId) => {
    return useQuery({
        queryKey: ["announcements", courseId],
        queryFn: () =>
            axios.get(`/api/announcement/course/${courseId}`)
                .then((resp) => resp.data),
    });
};

const useFetchAdminCourseAnnouncements = (courseId) => {
    return useQuery({
        queryKey: ["announcements", courseId],
        queryFn: () =>
            axios.get(`/api/announcement/admin/${courseId}`)
                .then((resp) => resp.data),
    });
};

const useAddAdminAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (announcement) => axios.post(`/api/announcement/admin`, announcement),
        onSuccess: (_, announcement) => {
            queryClient.invalidateQueries({ queryKey: ["announcements", announcement.courseId] });
        },
    });
};

const useUpdateAdminAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (announcement) => axios.put(`/api/announcement/admin`, announcement),
        onSuccess: (_, announcement) => {
            queryClient.invalidateQueries({ queryKey: ["announcements", announcement.courseId] });
        },
    });
};

const useDeleteAdminAnnouncement = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, courseId }) => axios.delete(`/api/announcement/admin/${id}`),
        onSuccess: (_, courseId) => {
            queryClient.invalidateQueries({ queryKey: ["announcements", courseId] });
        },
    });
};


export {
    useFetchAnnouncements,
    useFetchCourseAnnouncements,
    useFetchAdminCourseAnnouncements,
    useAddAdminAnnouncement,
    useUpdateAdminAnnouncement,
    useDeleteAdminAnnouncement
}