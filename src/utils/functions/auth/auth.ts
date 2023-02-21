import { getRandomString } from "..";
import { onFacebookLogin } from "./facebook";

export type OAuthProvider = "google" | "facebook" | "github";

export const oauthLogin = (provider: OAuthProvider) => {
  switch (provider) {
    case "google":
      const googleOAuthLoginPageUrl = getGoogleOAuthURL();
      window.location.href = googleOAuthLoginPageUrl;
      break;
    case "facebook":
      onFacebookLogin();
      break;
    case "github":
      const githubOAuthLoginPageUrl = getGithubOAuthURL();
      window.location.href = githubOAuthLoginPageUrl;
      break;
  }
};

export const getGoogleOAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: (process.env.NEXT_PUBLIC_REDIRECT_URI as string) + "/google",
    client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};

export const getGithubOAuthURL = () => {
  const rootUrl = "https://github.com/login/oauth/authorize";
  const options = {
    redirect_uri: (process.env.NEXT_PUBLIC_REDIRECT_URI as string) + "/github",
    client_id: process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID as string,
    scope: ["read:user", "user:email"].join(" "),
    state: getRandomString(16),
  };

  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
};
