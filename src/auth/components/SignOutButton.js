import { useMsal } from "@azure/msal-react";

import styles from "./Styles.module.css";

function handleLogout(instance) {
  instance.logoutRedirect().catch((e) => {
    console.error(e);
  });
}

export const SignOutButton = () => {
  const { instance } = useMsal();

  return (
    <button onClick={() => handleLogout(instance)} className={styles.button}>
      Sign out
    </button>
  );
};
