import { createContext, useEffect, useState } from "react";
import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";

export const AuthTokenContext = createContext(null);

// Context provider for the Microsoft JWT we send to our APIs
export const AuthTokenProvider = ({ children }) => {
  const { instance, inProgress, accounts } = useMsal();
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      const accessTokenRequest = {
        scopes: [
          "api://43099779-42d8-4bca-bff4-676dc29c1da1/AvailableSets.ReadAll",
        ],
        account: accounts[0],
      };

      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          // Acquire token silent success
          let accessToken = accessTokenResponse.accessToken;
          // Set the auth token
          // console.log(accessTokenResponse);
          setAuthToken(accessToken);
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance
              .acquireTokenPopup(accessTokenRequest)
              .then(function (accessTokenResponse) {
                // Acquire token interactive success
                let accessToken = accessTokenResponse.accessToken;
                // Set the auth token
                // console.log(accessTokenResponse);
                setAuthToken(accessToken);
              })
              .catch(function (error) {
                // Acquire token interactive failure
                console.log(error);
                setAuthToken("ERROR");
              });
          }
          console.log(error);
          setAuthToken("ERROR");
        });
    }
  }, [instance, inProgress, accounts, authToken]);

  // useEffect(() => {
  //   console.log("Auth token has changed to", authToken);
  // }, [authToken]);

  return (
    <AuthTokenContext.Provider value={authToken}>
      {children}
    </AuthTokenContext.Provider>
  );
};
