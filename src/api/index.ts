import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.API_URL,
  params: { api_key: process.env.API_KEY },
});

export { axiosClient };
