import axios from "axios";

const accessToken = localStorage.getItem("accessToken");

export const httpService = axios.create({
  baseURL: "http://localhost:3500",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
