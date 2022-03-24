import PropTypes from "prop-types";

import styles from "./Loading.module.css";

// npm install --save react-spinners-kit
export const Loading = ({ text }) => (
  <div className={styles.container}>
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
      alt="Loading gif"
      className={styles.gif}
    />
    <h2 className={styles.text}>{text}</h2>
  </div>
);

Loading.propTypes = {
  text: PropTypes.string,
};
