import { NODE_ENV } from "@utils/constants";
import { Env, FACEBOOK, GITHUB, GOOGLE, OAuthProvider } from "@utils/types";
import { getRandomString } from "..";

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

export const oauthLogin = (provider: OAuthProvider, path: string) => {
  window.location.href = getOAuthUrl(provider, path);
};

const getOAuthUrl = (provider: OAuthProvider, path: string) => {
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
    state: JSON.stringify({
      nounce: getRandomString(16) + new Date().getTime(),
      path,
    }),
    ...additionalQueries,
  }).toString();

  return `${endpoint}?${queries}`;
};
