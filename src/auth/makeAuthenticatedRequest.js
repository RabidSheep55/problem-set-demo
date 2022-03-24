import { InteractionRequiredAuthError } from "@azure/msal-browser";
// Wraps a fetch request to a URL with headers with the Authorization Bearer token
export const makeAuthenticatedRequest = (
  { instance, accounts },
  url,
  options
) => {
  const tokenRequest = {
    group: ["student"],
    account: accounts[0],
  };

  if (!options.headers) {
    options.headers = new Headers();
  }

  instance
    .acquireTokenSilent(tokenRequest)
    .then((accessTokenResponse) => {
      // Acquire token silent success
      let accessToken = accessTokenResponse.idToken;
      // Set the auth token to the request header and fetch
      options.headers.append("Authorization", `Bearer ${accessToken}`);
      return fetch(url, options);
    })
    .catch((error) => {
      if (error instanceof InteractionRequiredAuthError) {
        instance
          .acquireTokenPopup(tokenRequest)
          .then(function (accessTokenResponse) {
            // Acquire token interactive success
            let accessToken = accessTokenResponse.idToken;
            // Set the auth token to the request header and fetch
            options.headers.append("Authorization", `Bearer ${accessToken}`);
            return fetch(url, options);
          })
          .catch((error) => {
            // Acquire token interactive failure
            console.log(error);
          });
      }
      console.log(error);
    });

  return null;
};
