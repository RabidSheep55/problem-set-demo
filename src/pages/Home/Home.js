import { useMsal } from "@azure/msal-react";

import styles from "./styles/Home.module.css";

export const Home = () => {
  const { accounts } = useMsal();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        <span className={styles.username}>
          {accounts[0].name.split(", ")[1]}
        </span>
        , Welcome to your
        ME2 Fluid Mechanics Online Problem Sets.
      </h3><p>
      Please view in desktop mode only for now.</p>
    </div>
  );
};
