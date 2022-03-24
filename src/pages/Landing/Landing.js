import { useIsAuthenticated, useMsal } from "@azure/msal-react";

import { Link } from "react-router-dom";

import styles from "./styles/Landing.module.css";

export const Landing = () => {
  const isAuthenticated = useIsAuthenticated();
  const { accounts } = useMsal();

  return (
    <div className={styles.containerContainer}>
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>
            Welcome to a pre-prototype of
            <span className={styles.header1}> Lambda feedback</span>
          </h1>
        </div>
        <p className={styles.description}>
          This demo was created by Imperial undergraduate students Pierre
          Tharreau and Louis Manestar.{" "}
          {isAuthenticated ? (
            <span>
              Hi <span className={styles.username}>{accounts[0].name}</span>!
              click the button below to get to your home page.
            </span>
          ) : (
            "Try the demo!"
          )}
          <br />
          <span className={styles.info}>
            Note: the demo is under construction.
          </span>
        </p>
        <div className={styles.buttonContainer}>
          <Link
            to="/set/Demo"
            className={[styles.button, styles.example].join(" ")}
          >
            Try the demo
          </Link>
        </div>
        <ul className={styles.features}>
          <li>Rich, personalised, timely feedback for learners</li>
          <li>Teachers code feedback in any language</li>
          <li>Analytics for learners, and academic and pastoral tutors</li>
          <li>Structured Tutorial Videos</li>
          <li>Rich Media Support</li>
        </ul>
      </div>
    </div>
  );
};
