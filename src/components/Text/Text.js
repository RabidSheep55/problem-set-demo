import PropTypes from "prop-types";

import { parseEquations } from "utils/math_rendering/parseEquations";

import styles from "./Text.module.css";
import "./empasisStyles.css";

export const Text = ({ data, className = "" }) => {
  // There might be inline-math in the text supplied, parse it
  const parsed = parseEquations(data);
  return <div className={[styles.text, className].join(" ")}>{parsed}</div>;
};

Text.propTypes = {
  data: PropTypes.string.isRequired,
};
