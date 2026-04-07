import api from '../utils/axios';

/**
 * Authentication related API calls
 */
export const authService = {
    /**
     * @param {Object} credentials - { email, password }
     */
    login: async (credentials) => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    /**
     * @param {Object} userData - { name, email, password }
     */
    signup: async (userData) => {
        const response = await api.post('/auth/signup', userData);
        return response.data;
    },

    /**
     * Fetch the current authenticated user's profile
     */
    getProfile: async () => {
        const response = await api.get('/auth/profile');
        return response.data;
    },

    /**
     * Perform a logout on the server if necessary
     */
    logout: async () => {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    socialLogin: async (provider) => {
        const response = await api.get(`/auth/${provider}/authorize`);
        return response.data;
    }
};

// /**
//  * Example of another service (e.g., Courses)
//  */
// export const courseService = {
//     getAll: async (params) => {
//         const response = await api.get('/courses', { params });
//         return response.data;
//     },

//     getById: async (id) => {
//         const response = await api.get(`/courses/${id}`);
//         return response.data;
//     }
// };
