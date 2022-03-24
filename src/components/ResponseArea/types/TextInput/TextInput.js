import { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./TextInput.module.css";

import Text from "components/Text";

// Stateless TextInput Response Area
export const TextInput = ({ data, handleChange, feedback }) => {
  // On load, set the parent's 'response' to something more appropriate
  // by design, the parent ResponseArea has no idea how to format it
  useEffect(() => {
    handleChange("");
  }, [data, handleChange]);

  // Update TextInput response on change
  const handleInputChange = (event) => {
    event.preventDefault();
    // Update ResponseArea state
    handleChange(event.target.value);
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
        type="text"
        onChange={handleInputChange}
        className={styles.inputStyles}
        placeholder="Text"
      />
      {data.post_response_text && (
        <Text data={data.post_response_text} className={styles.postText} />
      )}
    </form>
  );
};

TextInput.propTypes = {
  // Response Area dict
  data: PropTypes.object.isRequired,

  // Function updates the parent component ResponseArea's state
  handleChange: PropTypes.func.isRequired,
};
