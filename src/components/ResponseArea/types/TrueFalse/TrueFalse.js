import { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./TrueFalse.module.css";

// Stateless TrueFalse Response Area
export const TrueFalse = ({ data, handleChange, feedback }) => {
  // On load, set the parent's 'response' to something more appropriate
  // by design, the parent ResponseArea has no idea how to format it
  useEffect(() => {
    handleChange(null);
  }, [data, handleChange]);

  // Update TrueFalse response on change
  const handleInputChange = (event) => {
    event.preventDefault();
    // Update ResponseArea state
    handleChange(event.target.value === "true" ? 1 : 0);
  };

  return (
    <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <ul className={styles.listContainerStyles}>
        <li className={styles.listStyles}>
          <input
            type="radio"
            onChange={handleInputChange}
            value="true"
            name="true-false"
          />
          <span className={styles.optionTextStyle}>True</span>
        </li>
        <li className={styles.listStyles}>
          <input
            type="radio"
            onChange={handleInputChange}
            value="false"
            name="true-false"
          />
          <span className={styles.optionTextStyle}>False</span>
        </li>
      </ul>
    </form>
  );
};

TrueFalse.propTypes = {
  // Response Area dict
  data: PropTypes.object.isRequired,

  // Function updates the parent component ResponseArea's state
  handleChange: PropTypes.func.isRequired,
};
