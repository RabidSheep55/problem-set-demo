import PropTypes from "prop-types";

import { DemoHeader } from "./DemoHeader";

import styles from "./DemoLayout.module.css";

export const DemoLayout = ({ children }) => {
  return (
    <div className={styles.mainContainer}>
      <DemoHeader />
      <div className={styles.contentWrapper}>
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </div>
  );
};

DemoLayout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.element),
    PropTypes.element.isRequired,
  ]),
};
