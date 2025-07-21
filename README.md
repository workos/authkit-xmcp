# XMCP + AuthKit

[XMCP](https://github.com/basementstudio/xmcp) is one of the easiest ways to get up and running quickly for MCP using TypeScript. This project is a demo to help you get started adding AuthKit to your XMCP server.

## Setup

You can create a new XMCP server via `npx create-xmcp-app@latest`. This will set up the file structure for the tools you need and give you `src/tools/greet.ts`.

To protect this tool with AuthKit, all you need to do is add the following URLs to `xmcp.config.ts`:

```ts
import { type XmcpConfig } from "xmcp";

// You either need to set the AUTHKIT_DOMAIN environment variable or replace the variable with hard-coded strings below.
const config: XmcpConfig = {
  experimental: {
    oauth: {
      baseUrl: "http://localhost:3002", // Or your future deployment URL
      endpoints: {
        authorizationUrl: `${process.env.AUTHKIT_DOMAIN}/oauth2/authorize`,
        tokenUrl: `${process.env.AUTHKIT_DOMAIN}/oauth2/token`,
        registerUrl: `${process.env.AUTHKIT_DOMAIN}/oauth2/register`,
        userInfoUrl: `${process.env.AUTHKIT_DOMAIN}/oauth2/userinfo`,
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
```

You can find your AuthKit domain in your [WorkOS Dashboard](https://workos.com), where you can also set the redirect URI to point to your resource server's `/callback` endpoint.

From here, you can run `npm run dev`. That's all!

## Accessing user info in tools

To access user info in tools, extract it from the JWT bearer token in the header. You can see an example of this in `src/tools/userInfo.ts`.

This works by using `import { headers } from "xmcp/headers"` to access the headers handled by XMCP, and verification is done by `jose` using the JWKS endpoint on the AuthKit domain.

To access organization information or richer user metadata, use the [WorkOS SDK](https://workos.com/docs/sdks/node).


