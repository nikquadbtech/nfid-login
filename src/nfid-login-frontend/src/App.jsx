import React, { useEffect, useState } from "react";
import initializeAuthClient from "./Auth";
import { AuthClient } from "@dfinity/auth-client";

const App = () => {
  const [principal, setPrincipal] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      console.log("redirect call..");

      const authClient = await AuthClient.create();

      if (await authClient.isAuthenticated()) {
        const identity = authClient.getIdentity();
        const userPrincipal = identity.getPrincipal();
        setPrincipal(userPrincipal.toText());
        setAuthenticated(true);
        console.log("User authenticated:", true);
        console.log("User principal:", userPrincipal.toText());
      } else {
        setAuthenticated(false);
        console.log("User authenticated:", false);
      }
    };

    handleRedirect();
  }, []);

  const handleLogin = async () => {
    await initializeAuthClient();

    // const authClient = await AuthClient.create();

    // if (await authClient.isAuthenticated()) {
    //   const identity = authClient.getIdentity();
    //   const userPrincipal = identity.getPrincipal();
    //   setPrincipal(userPrincipal.toText());
    //   setAuthenticated(true);
    //   console.log("User authenticated:", true);
    //   console.log("User principal:", userPrincipal.toText());
    // } else {
    //   setAuthenticated(false);
    //   console.log("User authenticated:", false);
    // }
  };
  const handleLogout = async () => {
    const authClient = await AuthClient.create();
    await authClient.logout();
    setPrincipal(null);
    setAuthenticated(false);
    console.log("User logged out");
  };

  return (
    <div className="nfid-container">
      <div className="logo"><img src="nfid-logo.svg" alt="ID" width={300}/>Login</div>
      
      {authenticated ? (
        <div>
          <h3>Principal: {principal}</h3>
          <p>
            You’re logged in! Your NFID Wallet is ready to give you secure and
            seamless access to ICP apps. Manage your digital identity with ease.
            Logout anytime to keep things safe.
          </p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <p>
            Securely access ICP apps with just a click. No extra steps or
            software needed—simply log in with your email and get started
            instantly!
          </p>
          <button onClick={handleLogin}>Login with NFID</button>
        </div>
      )}
    </div>
  );
};

export default App;
