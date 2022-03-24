import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// Microsoft Auth Imports
import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig } from "auth/authConfig";

// Allows components in the app to access the JWT required to calls to our APIs
import { AuthTokenProvider } from "auth/AuthTokenContext";

import { App } from "./pages/App";

import "normalize.css";
import "styles/Global.css";
import "styles/themes/default.css";

// Microsoft Auth Setup
const msalInstance = new PublicClientApplication(msalConfig);

ReactDOM.render(
  <StrictMode>
    <MsalProvider instance={msalInstance}>
      <AuthTokenProvider>
        <Router>
          <App />
        </Router>
      </AuthTokenProvider>
    </MsalProvider>
  </StrictMode>,
  document.getElementById("root")
);
