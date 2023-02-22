import { Env } from "@utils/types";

export * from "./pages";

export const NODE_ENV = process.env.NODE_ENV as Env;

export const oauthNounceCookieKey = "oauth_nounce";

const serverOrigins: Record<Env, string> = {
  development: "http://localhost:4000",
  test: "https://totokunaga.com",
  production: "https://totokunaga.com",
};
export const serverOrigin = serverOrigins[NODE_ENV];
export const serverEndpointPaths: Record<string, string> = {
  getAccessToken: "/api/sessions/token",
};
