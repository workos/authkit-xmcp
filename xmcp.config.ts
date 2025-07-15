import { type XmcpConfig } from "xmcp";

// You either need to set the AUTHKIT_DOMAIN environment variable or replace the varible with hard coded strings below.
const config: XmcpConfig = {
  experimental: {
    oauth: {
      baseUrl: "http://localhost:3002", // Or your future deployment URL
      endpoints: {
        authorizationUrl:process.env.AUTHKIT_DOMAIN + "/oauth2/authorize",
        tokenUrl: process.env.AUTHKIT_DOMAIN + "/oauth2/token",
        registerUrl: process.env.AUTHKIT_DOMAIN + "/oauth2/register",
        userInfoUrl: process.env.AUTHKIT_DOMAIN + "/oauth2/userinfo",
      },
      issuerUrl: process.env.AUTHKIT_DOMAIN as string,
      defaultScopes: ["openid", "profile", "email"],
    },
  },
  http: {
    port: 3002,
  },
};
// Don't forget to set your redirect URLs in the WorkOS dashboard.

export default config;