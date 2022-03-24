import PropTypes from "prop-types";

import styles from "./StepByStepNav.module.css";

export const StepByStepNav = ({
  increment,
  decrement,
  showAll,
  showUpTo,
  contentLength,
}) => (
  <nav className={styles.nav}>
    <button
      className={[styles.button, styles.stepUp].join(" ")}
      onClick={decrement}
      disabled={showUpTo === 1}
    >
      ⬆ Previous Step ⬆
    </button>
    <button
      className={[styles.button, styles.stepDown].join(" ")}
      onClick={increment}
      disabled={showUpTo === contentLength}
    >
      ⬇ Next Step ⬇
    </button>
    <button
      className={[styles.button, styles.revealAll].join(" ")}
      onClick={showAll}
      disabled={showUpTo === contentLength}
    >
      Show All
    </button>
  </nav>
);

StepByStepNav.propTypes = {
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  showAll: PropTypes.func.isRequired,
  showUpTo: PropTypes.number.isRequired,
  contentLength: PropTypes.number.isRequired,
};
