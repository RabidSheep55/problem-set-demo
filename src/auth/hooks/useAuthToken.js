import {
  InteractionRequiredAuthError,
  InteractionStatus,
} from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import { useEffect } from "react";

// Custom Hook returns an Authentication token, to be used by our APIs
export const useAuthToken = () => {
  const { instance, inProgress, accounts } = useMsal();

  useEffect(() => {
    if (inProgress === InteractionStatus.None) {
      const accessTokenRequest = {
        scopes: ["user.read"],
        account: accounts[0],
      };

      console.log("Fetching a new token btw");

      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((accessTokenResponse) => {
          // Acquire token silent success
          let accessToken = accessTokenResponse.accessToken;
          // Return the Access Token
          return accessToken;
        })
        .catch((error) => {
          if (error instanceof InteractionRequiredAuthError) {
            instance
              .acquireTokenPopup(accessTokenRequest)
              .then(function (accessTokenResponse) {
                // Acquire token interactive success
                let accessToken = accessTokenResponse.accessToken;
                // Return the Access Token
                return accessToken;
              })
              .catch(function (error) {
                // Acquire token interactive failure
                console.log(error);
                return null;
              });
          }
          console.log(error);
          return null;
        });
    }
  }, [instance, inProgress, accounts]);
};
