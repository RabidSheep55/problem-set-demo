import PropTypes from "prop-types";

import styles from "./SubmitButton.module.css";

export const SubmitButton = ({ onClick, isLoading }) => (
  <button className={styles.button} onClick={onClick} disabled={isLoading}>
    Submit
  </button>
);

SubmitButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};
