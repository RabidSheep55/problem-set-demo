import { useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./Matrix.module.css";

import Text from "components/Text";

// COMPONENT SETUP
const setupKeys = (shape) => {
  const ids = [...Array(shape[0] * shape[1]).keys()];
  const keys = [];
  while (ids.length) keys.push(ids.splice(0, shape[1]));
  return keys;
};

// Stateless Matrix Response Area
export const Matrix = ({ data, handleChange, feedback }) => {
  // On load, set the parent's 'response' to something more appropriate
  // (parent has no idea how Matrixes should format responses.. but we do here!)
  useEffect(() => {
    // Fill with list of empty lists of the right shape
    handleChange([...Array(data.shape[0])].map(() => Array(data.shape[1])));
  }, [data, handleChange]);

  // Update Matrix response on change
  const handleInputChange = (event) => {
    event.preventDefault();

    const locString = event.target.dataset.loc;
    const loc = locString.split("-").map((e) => parseInt(e));
    handleChange((prev) => {
      prev[loc[0]][loc[1]] = parseFloat(event.target.value);
      // console.log(prev.map((e) => e.join(" ")).join("\n"));
      return prev;
    });
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
      <table className={styles.tableStyles}>
        <tbody>
          {setupKeys(data.shape).map((row, i) => (
            <tr key={`row-${i}`}>
              {row.map((item, j) => (
                <td id={`item-${item}`} key={`item-${item}`}>
                  <input
                    className={styles.inputStyles}
                    type="text"
                    name={`field-${item}`}
                    data-loc={`${i}-${j}`}
                    onChange={handleInputChange}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.post_response_text && (
        <Text data={data.post_response_text} className={styles.postText} />
      )}
    </form>
  );
};

Matrix.propTypes = {
  data: PropTypes.shape({
    shape: PropTypes.array.isRequired,
  }),
  handleChange: PropTypes.func.isRequired,
};
