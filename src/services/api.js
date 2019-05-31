import axios from "axios";

const baseURL = "http://e0fd175f.ngrok.io";

const instance = axios.create({
  baseURL
});

export default instance;
