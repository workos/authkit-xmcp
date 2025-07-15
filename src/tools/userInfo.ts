import { headers } from "xmcp/headers";
import { jwtVerify, createRemoteJWKSet } from 'jose';

// Define the schema for tool parameters
export const schema = {};

// Define tool metadata
export const metadata = {
  name: "userInfo",
  description: "Get the user info",
  annotations: {
    title: "Get the user info",
  }
};

// Tool implementation
export default async function userInfo() {
  const header = headers();

  const JWKS = createRemoteJWKSet(new URL(process.env.AUTHKIT_DOMAIN + '/oauth2/jwks'));
  const token = header.authorization?.split(' ')[1];

  if (!token) {
    return {
      content: [{ type: "text", text: "No bearer token found in the Authorization header." }],
    };
  }

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: process.env.AUTHKIT_DOMAIN as string,
    });

    // Payload now contains user info and claims
    console.log(payload);
    return {
      content: [
        { type: "text", text: "User info: " + JSON.stringify(payload.sub, null, 2) },
      ],
    };
  } catch (err) {
    return {
      content: [{ type: "text", text: `Token verification failed: ${err}` }],
    };
  }
}
