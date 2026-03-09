import axios from "axios";
import Cookies from "js-cookie";

const API = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL
});

API.interceptors.request.use((config) => {
	const token = Cookies.get("token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

API.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			const currentToken = Cookies.get("token");

			// DEBUG
			console.log("🔴 401 keldi!", {
				url: error.config.url,
				currentPath: window.location.pathname,
				tokenBormi: !!currentToken
			});

			if (!currentToken) {
				console.log("🚪 Token yo'q, login ga yuborilmoqda");
				window.location.href = "/login";
				return Promise.reject(error);
			}

			const publicPaths = ["/auth/callback", "/login", "/teacher-login"];
			const isPublicPage = publicPaths.some((path) =>
				window.location.pathname.startsWith(path)
			);

			console.log("📍 isPublicPage:", isPublicPage);

			if (!isPublicPage) {
				console.log("🚪 LOGOUT! Sabab:", error.config.url);
				Cookies.remove("token");
				localStorage.removeItem("userRole");
				window.location.href = "/login";
			}
		}
		return Promise.reject(error);
	}
);

export default API;