import PropTypes from "prop-types";

import { QuestionIcons } from "./QuestionIcons";

import ContentContainer from "components/ContentContainer";

// To remove once master_statement structure is phased out
import { parseEquations } from "utils/math_rendering/parseEquations";
import MediaContainer from "components/MediaContainer";

import styles from "../styles/Question.module.css";

export const QuestionHeader = ({ data }) => (
  <div className={styles["question-header"]}>
    <div className={styles["question-header-top"]}>
      {data.title && (
        <h1>
          {data.number} {data.title}
        </h1>
      )}
      {data.icon_data && <QuestionIcons iconsData={data.icon_data} />}
    </div>

    {/* Old Solution  
    {data.master_statement && (
      <p className={styles["master-statement"]}>
        <span style={{ color: "red" }}>
          <i>[Still uses `master-statement`] </i>
        </span>
        {parseEquations(data.master_statement)}
      </p>
    )}
    {data.media && <MediaContainer data={data.media} />}
    */}

    {data.master_content && (
      <ContentContainer
        contentList={data.master_content}
        uniqueKey={`set${data.number}`}
      />
    )}
  </div>
);

QuestionHeader.propTypes = {
  data: PropTypes.object.isRequired,
};
