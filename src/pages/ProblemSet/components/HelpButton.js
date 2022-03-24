import PropTypes from "prop-types";

import styles from "../styles/HelpButton.module.css";

export const HelpButton = ({ onClick }) => {
  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={() => onClick()}>
        Help
      </button>
    </div>
  );
};

HelpButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};
