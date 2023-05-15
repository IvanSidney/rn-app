import { create } from "apisauce";

export default apiClient = create({
    baseURL: "http://192.168.0.109:9999/api",
    headers: {
        "Content-Type": "application/json",
        " Accept": "application/json",
    },
});
