import PropTypes from "prop-types";

import styles from "../styles/SetNavigation.module.css";

export const SetNavigation = ({ onChange, questions, selectedQuestion }) => {
  const handleChange = (e) => {
    const newIndex = e.currentTarget.dataset.questionind;
    onChange(parseInt(newIndex));
  };

  return (
    <nav className={styles.nav}>
      <ol className={styles.container}>
        {questions.map((q, i) => (
          <li
            className={[
              styles.item,
              selectedQuestion === i && styles.active,
            ].join(" ")}
            key={i}
            data-questionind={i}
            onClick={handleChange}
          >
            {selectedQuestion === i && <span className={styles.activeBox} />}
            <span className={styles.itemNumber}>{i + 1}.</span>
            <span className={styles.itemName}>{q}</span>
          </li>
        ))}
      </ol>
    </nav>
  );
};

SetNavigation.propTypes = {
  onChange: PropTypes.func.isRequired,
  questions: PropTypes.array.isRequired,
  selectedQuestion: PropTypes.number.isRequired,
};
