import { onFacebookLogin } from "./facebook";

export type OAuthProvider = "google" | "facebook";

export const oauthLogin = (provider: OAuthProvider) => {
  switch (provider) {
    case "google":
      const oauthLoginPageUrl = getGoogleOAuthURL();
      window.location.href = oauthLoginPageUrl;
      break;
    case "facebook":
      onFacebookLogin();
      break;
  }
};

export const getGoogleOAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: process.env.NEXT_PUBLIC_REDIRECT_URI as string,
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
