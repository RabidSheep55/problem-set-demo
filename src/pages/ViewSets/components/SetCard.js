import PropTypes from "prop-types";

import styles from "../styles/SetCard.module.css";

export const SetCard = ({ title, number, description, isCompleted }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>
      <span>{number}</span>. {title}
    </h1>
    <p className={styles.description}>
      {description || "Description for this problem set was not provided"}
    </p>
    {isCompleted !== undefined && (
      <div className={styles.icons}>{isCompleted ? "✔" : "✖"}</div>
    )}
  </div>
);

SetCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
};
