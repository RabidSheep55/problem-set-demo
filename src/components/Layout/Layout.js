import PropTypes from "prop-types";

import { Header } from "./Header";
// import { Footer } from "./Footer";

import styles from "./Layout.module.css";

export const Layout = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>{children}</div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};
