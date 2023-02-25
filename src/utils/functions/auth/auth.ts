import Cookies from "universal-cookie";

import { NODE_ENV } from "@utils/constants";
import { Env, FACEBOOK, GITHUB, GOOGLE, OAuthProvider } from "@utils/types";
import { decodeJwt, getRandomString } from "..";
import { serverInstance } from "@utils/api";
import { store } from "@utils/slices";
import {
  setAccessToken,
  setAuth,
  setAvatorImagePath,
  setOAuthProvider,
  setUsername,
} from "@utils/slices/authSlice";

type OAuthConfig = {
  endpoint: string;
  redirect_uri: string;
  client_id: string;
  scope: string;
  additionalQueries?: Record<string, string>;
};

const redirectPath = "/api/sessions/oauth";
const rootRedirectUrl: Record<Env, string> = {
  development: "http://localhost:4000" + redirectPath,
  test: "https://totokunaga.com" + redirectPath,
  production: "https://totokunaga.com" + redirectPath,
};

const oauthConfig: Record<OAuthProvider, OAuthConfig> = {
  google: {
    endpoint: "https://accounts.google.com/o/oauth2/v2/auth",
    redirect_uri: rootRedirectUrl[NODE_ENV] + `/${GOOGLE}`,
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
    additionalQueries: {
      access_type: "offline",
      response_type: "code",
      prompt: "consent",
    },
  },
  facebook: {
    endpoint: "https://www.facebook.com/v16.0/dialog/oauth",
    redirect_uri: rootRedirectUrl[NODE_ENV] + `/${FACEBOOK}`,
    client_id: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID as string,
    scope: ["email"].join(" "),
  },
  github: {
    endpoint: "https://github.com/login/oauth/authorize",
    redirect_uri: rootRedirectUrl[NODE_ENV] + `/${GITHUB}`,
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
    scope: ["read:user", "user:email"].join(" "),
  },
};

export const oauthLogin = async (provider: OAuthProvider, path: string) => {
  const now = new Date().getTime();
  const nounce = getRandomString(16) + now;
  await serverInstance.post("/api/sessions/oauth/save_nounce", { nounce });
  window.location.href = getOAuthUrl(provider, path, nounce);
};

export const oauthLogout = async (accessToken: string) => {
  await serverInstance.post("/api/sessions/oauth/logout", undefined, {
    headers: { Authorization: accessToken },
  });
};

const getOAuthUrl = (provider: OAuthProvider, path: string, nounce: string) => {
  const {
    endpoint,
    client_id,
    redirect_uri,
    scope,
    additionalQueries = {},
  } = oauthConfig[provider];

  const queries = new URLSearchParams({
    redirect_uri,
    client_id,
    scope,
    state: JSON.stringify({ nounce, path }),
    ...additionalQueries,
  }).toString();

  return `${endpoint}?${queries}`;
};

export const refreshAccessToken = async () => {
  const { dispatch } = store;

  const cookie = new Cookies();
  const accessToken = localStorage.getItem("token") || cookie.get("token");
  if (!accessToken) {
    return;
  }
  localStorage.removeItem("token");
  cookie.remove("token");

  try {
    const response = await serverInstance.get("/api/sessions/token/refresh", {
      headers: { Authorization: accessToken },
    });
    const newAccessToken = response.data;
    const decodedToken = decodeJwt(newAccessToken);
    if (!decodedToken) {
      return;
    }

    const { metadata } = decodedToken.payload;
    const { name, oauthProvider, avatorImagePath } = metadata;

    if (avatorImagePath) {
      dispatch(setAvatorImagePath(avatorImagePath));
    }

    dispatch(setAuth(true));
    dispatch(setUsername(name));
    dispatch(setOAuthProvider(oauthProvider));
    dispatch(setAccessToken(newAccessToken));
  } catch (e: any) {
    console.error(e.message);
  }
};
