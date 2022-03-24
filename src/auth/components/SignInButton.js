import { useMsal } from "@azure/msal-react";
import { loginRequest } from "auth/authConfig";

import styles from "./Styles.module.css";

function handleLogin(instance) {
  instance.loginRedirect(loginRequest).catch((e) => {
    console.error(e);
  });
}

// Button which redirects to Microsoft Login page
export const SignInButton = ({ className, children }) => {
  const { instance } = useMsal();

  return (
    <button
      onClick={() => handleLogin(instance)}
      className={className || styles.button}
    >
      {children ? children : "Sign in"}
    </button>
  );
};
