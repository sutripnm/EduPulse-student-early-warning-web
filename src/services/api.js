import axios from "axios";

const api = axios.create({
  baseURL:
    "https://9c00-2402-8780-1018-1ae8-d4f5-24d2-a607-cbad.ngrok-free.app/api",
});

export const getDashboardSummary = async (angkatan) => {
  const response = await api.get("/v1/dashboard/summary/", {
    params: {
      angkatan,
    },
  });

  return response.data;
};

export default api;