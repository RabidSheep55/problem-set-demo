import { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./NumberInput.module.css";

import Text from "components/Text";

// Stateless TextInput Response Area
export const NumberInput = ({ data, handleChange, feedback }) => {
  // On load, set the parent's 'response' to something more appropriate
  // by design, the parent ResponseArea has no idea how to format it
  useEffect(() => {
    handleChange("");
  }, [data, handleChange]);

  // Update TextInput response on change
  const handleInputChange = (event) => {
    event.preventDefault();
    // Update ResponseArea state
    handleChange(parseFloat(event.target.value));
  };

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => e.preventDefault()}
      className={styles.form}
    >
      {data.pre_response_text && (
        <Text data={data.pre_response_text} className={styles.preText} />
      )}
      <input
        type="number"
        onChange={handleInputChange}
        className={styles.inputStyles}
        placeholder="Number"
      />
      {data.post_response_text && (
        <Text data={data.post_response_text} className={styles.postText} />
      )}
    </form>
  );
};

NumberInput.propTypes = {
  // Response Area dict
  data: PropTypes.object.isRequired,

  // Function updates the parent component ResponseArea's state
  handleChange: PropTypes.func.isRequired,
};
