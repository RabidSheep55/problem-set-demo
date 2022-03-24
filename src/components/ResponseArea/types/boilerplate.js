import { useEffect } from "react";
import PropTypes from "prop-types";

// Stateless COMPONENT_NAME Response Area
export const COMPONENT_NAME = ({ data, handleChange, feedback }) => {
  // On load, set the parent's 'response' to something more appropriate
  // by design, the parent ResponseArea has no idea how to format it
  useEffect(() => {
    handleChange(/* ... */);
  }, [data, handleChange]);

  // Update COMPONENT_NAME response on change
  const handleInputChange = (event) => {
    event.preventDefault();
    // Update ResponseArea state
    handleChange(/* ... */);
  };

  return (
    <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <input onChange={handleInputChange} />
    </form>
  );
};

COMPONENT_NAME.propTypes = {
  // Response Area dict
  data: PropTypes.object.isRequired,

  // Function updates the parent component ResponseArea's state
  handleChange: PropTypes.func.isRequired,
};
