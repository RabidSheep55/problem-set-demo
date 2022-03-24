import PropTypes from "prop-types";

import styles from "../styles/QuestionNavigation.module.css";

export const QuestionNavigation = ({
  onChange,
  numberOfParts,
  selectedPart,
}) => {
  const tabs = "abcdefghijklmnopqrstuvwxyz".split("").slice(0, numberOfParts);

  const handleChange = (e) => {
    const newIndex = e.target.dataset.partind;
    onChange(parseInt(newIndex));
  };

  return (
    <nav>
      <ul className={styles.container}>
        {tabs.map((e, i) => (
          <li
            className={[
              styles.navItem,
              selectedPart === i && styles.active,
            ].join(" ")}
            key={i}
            data-partind={i}
            onClick={handleChange}
          >
            ({e})
          </li>
        ))}
        <li className={styles.navEndLine}></li>
      </ul>
    </nav>
  );
};

QuestionNavigation.propTypes = {
  onChange: PropTypes.func.isRequired,
  numberOfParts: PropTypes.number.isRequired,
  selectedPart: PropTypes.number.isRequired,
};
