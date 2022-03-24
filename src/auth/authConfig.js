export const msalConfig = {
  auth: {
    clientId: "ca92edb1-eb47-44b3-85a7-1011c51fb945",
    authority:
      "https://login.microsoftonline.com/2b897507-ee8c-4575-830b-4f8267c3d307",
    redirectUri:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : "https://lambdafeedback.com/",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  },
};

export const loginRequest = {};
