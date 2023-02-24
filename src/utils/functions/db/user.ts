import { serverInstance } from "@utils/index";

export const getAvator = async () => {
  const response = await serverInstance.get("/api/db/user/avator");
  return response.data;
};
