import api from '../utils/axios';

export const udemyCourseService = {
    allCourses: async (params) => {
        const response = await api.get('/udemy-courses/', { params: params });
        return response.data;
    },
    getCourse: async (slug) => {
        const response = await api.get(`/udemy-courses/slug/${slug}/`);
        return response.data;
    },
    allCategories: async () => {
        const response = await api.get('/udemy-courses/categories');
        return response.data;
    }
};