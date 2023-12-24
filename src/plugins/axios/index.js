import axios from "axios";
import jwt from "../jwt";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.put["Content-Type"] = "application/json";
axios.defaults.withCredentials = false;
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL

export default axios.create();
