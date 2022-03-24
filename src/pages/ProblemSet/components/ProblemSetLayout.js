import { useState, useEffect } from "react";

import { Question } from "./Question";
import { SetNavigation } from "./SetNavigation";
import { SetHeader } from "./SetHeader";

import styles from "../styles/ProblemSetLayout.module.css";

export const ProblemSetLayout = ({ setData }) => {
  // List of questions
  const [questionTitles, setQuestionTitles] = useState(
    setData.questions_data.reduce((acc, cur) => [...acc, cur.title], [])
  );

  // Selected question
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const selectQuestion = (index) => {
    setSelectedQuestion(index);
  };

  useEffect(() => {
    // Reset selected question when data changes
    setSelectedQuestion(0);
  }, [setData]);

  return (
    <div className={styles.problemSet}>
      <Question qData={setData.questions_data[selectedQuestion]} />

      <div className={styles.sidebarContainer}>
        <div className={styles.sidebar}>
          <SetHeader
            name={setData.name}
            number={setData.number}
            setId={setData._id}
          />
          <SetNavigation
            onChange={selectQuestion}
            questions={questionTitles}
            selectedQuestion={selectedQuestion}
          />
        </div>
      </div>
    </div>
  );
};
