import PropTypes from "prop-types";

import styles from "./Feedback.module.css";

export const Feedback = ({ data }) => {
  if (data?.hasOwnProperty("is_correct")) {
    return (
      <>
        {data.is_correct ? (
          <div>
            <p className={styles.correct}>Correct!</p>
          </div>
        ) : (
          <div>
            <p className={styles.incorrect}>Incorrect</p>
          </div>
        )}
      </>
    );
  }

  if (data?.error) {
    return (
      <div>
        {data.error.description && (
          <p className={styles.error}>{data.error.description}</p>
        )}
      </div>
    );
  }

  return <></>;
};

Feedback.propTypes = {
  result: PropTypes.object,
};
