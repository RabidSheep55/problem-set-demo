import { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { parseEquations } from "utils/math_rendering/parseEquations";
import { shuffleArray } from "utils/shuffleArray";

import styles from "./MultipleChoice.module.css";

// Stateless MultipleChoice Response Area
export const MultipleChoice = ({ data, handleChange, feedback }) => {
  // On load, set the parent's 'response' to something more appropriate
  // by design, the parent ResponseArea has no idea how to format it
  useEffect(() => {
    if (data.singleAnswer) {
      handleChange(null);
    } else {
      handleChange(new Array(data.options?.length || 0).fill(0));
    }
  }, [data, handleChange]);

  // Update MultipleChoice response on change
  const handleInputChange = (event) => {
    event.preventDefault();
    // Update ResponseArea state
    if (data.singleAnswer) {
      handleChange(event.target.value);
    } else {
      handleChange((prev) => {
        prev[parseInt(event.target.value)] = event.target.checked ? 1 : 0;
        return prev;
      });
    }
  };

  // Need a way to only shuffle the elements once, when the component loads
  // So elements are stored in the state
  const [elements] = useState(() => {
    if (!data.options) {
      return "An error occured (no choices in MultipleChoice)";
    }

    let els = data.options.map((item, i) => (
      <li className={styles.li} key={i}>
        <label className={styles.item}>
          <input
            type={data.singleAnswer ? "radio" : "checkbox"}
            onChange={handleInputChange}
            value={i}
            name="multiple-choice"
            className={styles.checkbox}
          />
          <p className={styles.choice}>{parseEquations(item)}</p>
        </label>
      </li>
    ));

    // If shuffle is set to true, shuffle the array but only once
    if (data.shuffle) {
      els = shuffleArray(els);
    }

    return els;
  });

  return (
    <form autoComplete="off" onSubmit={(e) => e.preventDefault()}>
      <ul className={styles.ul}>{elements}</ul>
    </form>
  );
};

MultipleChoice.propTypes = {
  // Response Area dict
  data: PropTypes.shape({
    options: PropTypes.array.isRequired,
    singleAnswer: PropTypes.bool,
  }),

  // Function updates the parent component ResponseArea's state
  handleChange: PropTypes.func.isRequired,
};
