import PropTypes from "prop-types";

import { MdPictureAsPdf } from "react-icons/md";

import styles from "../styles/SetHeader.module.css";

export const SetHeader = ({ number, name, setId }) => (
  <div className={styles.headerContainer}>
    <h1>
      <span className={styles.headerId}>Problem Set {number}: </span>
      <span className={styles.headerTitle}>{name}</span>
      <span>
        <a
          href={`/PDFs/${setId}.pdf`}
          target="_blank"
          rel="noreferrer"
          className={styles.pdfLink}
        >
          <MdPictureAsPdf className={styles.pdfIcon} />
        </a>
      </span>
    </h1>
  </div>
);

SetHeader.propTypes = {
  number: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};
