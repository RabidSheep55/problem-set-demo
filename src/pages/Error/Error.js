import { Link } from "react-router-dom";

import styles from "./Error.module.css";

export const Error = () => (
  <div className={styles.error}>
    <h1 className={styles.title}>Couldn't find the page you requested :/</h1>

    <Link to="/MECH50010" className={styles.button}>
      Take me home
    </Link>
  </div>
);
