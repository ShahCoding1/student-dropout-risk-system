import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getDashboard = async () => {
  const response = await api.get("/api/dashboard");
  return response.data;
};

export const getStudents = async (risk = "") => {
  const response = await api.get("/api/students", {
    params: risk ? { risk } : {},
  });
  return response.data;
};

export const getModelInfo = async () => {
  const response = await api.get("/api/model-info");
  return response.data;
};

export const predictStudent = async (studentData) => {
  const response = await api.post("/api/predict", studentData);
  return response.data;
};

export default api;