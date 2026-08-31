import axios from "axios";

const api = axios.create({
  baseURL:
    "https://950e-2402-8780-1018-1ae8-d0d4-dbf4-15d7-a35b.ngrok-free.app/api",
});

export default api;