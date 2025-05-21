import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://finance-app-ai.vercel.app/",
});
