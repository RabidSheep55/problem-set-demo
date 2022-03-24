import { useEffect } from "react";
import PropTypes from "prop-types";

import { Math } from "utils/math_rendering/Math";
import Text from "components/Text";

import styles from "./ExpressionInput.module.css";

// Stateless ExpressionInput Response Area, similar to TextInput, but renders latex
export const ExpressionInput = ({ data, handleChange, feedback }) => {
  // On load, set the parent's 'response' to something more appropriate
  // by design, the parent ResponseArea has no idea how to format it
  useEffect(() => {
    handleChange("");
  }, [data, handleChange]);

  // Update ExpressionInput response on change
  const handleInputChange = (e) => {
    e.preventDefault();
    // Update ResponseArea state
    handleChange(e.target.value);
  };

  return (
    <form
      autoComplete="off"
      className={styles.container}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={styles.inputContainer}>
        <div className={styles.inputWrapper}>
          {data.pre_response_text && (
            <Text data={data.pre_response_text} className={styles.preText} />
          )}
          <input
            type="text"
            onChange={handleInputChange}
            placeholder="Expression"
            className={styles.input}
          />
          {data.post_response_text && (
            <Text data={data.post_response_text} className={styles.postText} />
          )}
        </div>
        <p className={styles.powered}>
          Verification powered by {data.gradeFunction}
        </p>
      </div>
      {feedback?.response_latex && (
        <div className={styles.interpContainer}>
          <p className={styles.interpText}>Your answer was understood as: </p>
          <div className={styles.eq}>
            <Math tex={feedback.response_latex} />
          </div>
        </div>
      )}
    </form>
  );
};

ExpressionInput.propTypes = {
  // Response Area dict
  data: PropTypes.object.isRequired,

  // Function updates the parent component ResponseArea's state
  handleChange: PropTypes.func.isRequired,
};
