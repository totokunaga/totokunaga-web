import axios from "axios";
import { serverOrigin } from "..";

export const serverInstance = axios.create({
  baseURL: serverOrigin,
  timeout: 10000,
  withCredentials: true,
});
