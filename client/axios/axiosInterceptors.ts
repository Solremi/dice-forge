import axiosInstance, {
  addTokenJwtToAxiosInstance,
  removeTokenJwtFromAxiosInstance,
} from './axios';

/**
 * The function `setupInterceptors` sets up response interceptors for handling 401
 * errors by removing the token and redirecting to the login page.
 * @param navigate - The `navigate` parameter is a function that takes a `patch`
 * (string) as an argument and is used to redirect the user to a different page or
 * route in the application. In the provided code snippet, it is used to navigate
 * the user to the '/login' page when a 401 (Pas complètement fonctionnel)
 */
const setupInterceptors = (navigate: (patch: string) => void) => {
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response && error.response.status === 401) ||
        (error.response.status === 403 && !originalRequest.isRetry)
      ) {
        originalRequest.isRetry = true;
        try {
          const refreshToken = sessionStorage.getItem('refreshToken');
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await axiosInstance.post('/api/refresh-token', {
            token: refreshToken,
          });

          const { accessToken } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          addTokenJwtToAxiosInstance(accessToken);

          // Update the Authorization header for the original request
          originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        } catch (err) {
          console.error('Failed to refresh token', err);
          sessionStorage.removeItem('accessToken');
          sessionStorage.removeItem('refreshToken');
          removeTokenJwtFromAxiosInstance();
          navigate('/api/login');
        }
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
