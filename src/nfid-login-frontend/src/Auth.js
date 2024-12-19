import { AuthClient } from "@dfinity/auth-client";

async function initializeAuthClient() {
  const authClient = await AuthClient.create();

  const identityProvider = "https://nfid.one/authenticate";

  const loginOptions = {
    identityProvider, // URL for NFID login
    onSuccess: async () => {
      const identity = authClient.getIdentity();
      window.location.reload();
      console.log("Authenticated identity:", identity);
    },
    onError: (error) => {
      console.error("Login failed:", error);
    },
  };

  authClient.login(loginOptions);
}

export default initializeAuthClient;
