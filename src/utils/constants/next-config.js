const { NODE_ENV } = process.env;

const isDev = NODE_ENV === "development";

const styleSrc = ["https://fonts.googleapis.com"];
const fontSrc = ["https://fonts.gstatic.com"];

const oauthProfileImageSrc = [
  "https://platform-lookaside.fbsbx.com",
  "https://lh3.googleusercontent.com",
  "https://avatars.githubusercontent.com",
];

const connectSrc = isDev ? "localhost:4000" : "https://totokunaga.com";
const scriptSrc = isDev ? "'unsafe-eval'" : "";

// TODO: Should remove 'unsafe-inline'
const ContentSecurityPolicy = `
  default-src 'self';
  img-src 'self' ${oauthProfileImageSrc.join(" ")};
  style-src 'self' 'unsafe-inline' ${styleSrc};
  font-src 'self' ${fontSrc};
  connect-src 'self' ${connectSrc};
  script-src 'self' 'unsafe-inline' ${scriptSrc};
`;

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
];

module.exports = { securityHeaders };
