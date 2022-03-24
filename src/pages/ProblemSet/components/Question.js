import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { QuestionHeader } from "./QuestionHeader";
import { QuestionNavigation } from "./QuestionNavigation";
import { Part } from "./Part";

import { MathContext } from "utils/math_rendering/MathContext";

import styles from "../styles/Question.module.css";

export const Question = ({ qData }) => {
  const [selectedPart, setSelectedPart] = useState(0);
  const selectPart = (index) => {
    setSelectedPart(index);
  };

  // If we just loaded a new question, reset the index
  useEffect(() => {
    setSelectedPart(0);
  }, [qData]);

  const headerData = {
    title: qData.title,
    number: qData.number,
    master_statement: qData.master_statement,
    master_content: qData.master_content,
    media: qData.media,
    icon_data: qData.icon_data,
  };

  if (!qData) {
    return <div>Something went wrong</div>;
  }
  return (
    <MathContext>
      <div className={styles["question"]}>
        <QuestionHeader data={headerData} />
        {qData.parts?.length >= 2 && (
          <QuestionNavigation
            numberOfParts={qData.parts.length}
            selectedPart={selectedPart}
            onChange={selectPart}
          />
        )}
        {qData.parts && (
          <Part pData={qData.parts[selectedPart]} pIndex={selectedPart} />
        )}
      </div>
    </MathContext>
  );
};

Question.propTypes = {
  qData: PropTypes.object.isRequired,
};
