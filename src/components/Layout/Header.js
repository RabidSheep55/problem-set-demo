import { NavLink } from "react-router-dom";
import { useIsAuthenticated } from "@azure/msal-react";

import { SignOutButton } from "auth/components/SignOutButton";

import styles from "./Header.module.css";

const headerLinks = [
  // {
  //   title: "Landing",
  //   to: "/",
  // },
  {
    title: "Home",
    to: "/MECH50010",
  },
  {
    title: "Sets",
    to: "/set",
  },
];

export const Header = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>ME2 Fluid Mechanics</h1>
        <nav className={styles.nav}>
          {headerLinks.map((el, i) => (
            <NavLink
              to={el.to}
              activeClassName={styles.activeLink}
              className={styles.link}
              key={i}
              exact={el.to === "/"}
            >
              {el.title}
            </NavLink>
          ))}
        </nav>
        <div>{isAuthenticated ? <SignOutButton /> : <p>Version 0.1</p>}</div>
      </header>
    </div>
  );
};
