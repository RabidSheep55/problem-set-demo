import { NavLink, useLocation } from "react-router-dom";

import styles from "./DemoHeader.module.css";

export const DemoHeader = () => {
  const location = useLocation();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Lambda Feedback - Demo</h1>
        <nav className={styles.nav}>
          <NavLink
            to="/"
            activeClassName={styles.activeLink}
            className={styles.link}
            exact
          >
            Landing
          </NavLink>

          <NavLink
            to={location.pathname}
            activeClassName={styles.activeLink}
            className={styles.link}
            exact
          >
            {location.pathname.split("/").slice(-1)}
          </NavLink>
        </nav>
        <div>
          <p>Version 0.1</p>
        </div>
      </header>
    </div>
  );
};
