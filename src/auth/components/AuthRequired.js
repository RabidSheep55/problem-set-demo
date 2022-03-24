import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
} from "@azure/msal-react";

import { SignInButton } from "./SignInButton";

import styles from "./Styles.module.css";

export const AuthRequired = ({ children }) => {
  return (
    <div>
      <AuthenticatedTemplate>{children}</AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <div className={styles.unauthPage}>
          <h1>Login is required to access this content</h1>
          <SignInButton />
        </div>
      </UnauthenticatedTemplate>
    </div>
  );
};
