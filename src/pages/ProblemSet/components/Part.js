import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import ContentContainer from "components/ContentContainer";
import { HelpButton } from "./HelpButton";
import { AnswerHelp } from "./AnswerHelp";

// Can remove this once all sheets use the PartContent syntax
// import { parseEquations } from "utils/math_rendering/parseEquations";

export const Part = ({ pData, pIndex }) => {
  const [showAnswerHelp, setShowAnswerHelp] = useState(false);
  const toggleAnswerHelp = () => {
    setShowAnswerHelp((prev) => !prev);
  };

  // If we load a new part, reset the state of the Help Button
  useEffect(() => {
    setShowAnswerHelp(false);

    // if pData contains a worked_solutions, make a pass to inject final answer
    if (pData?.worked_solutions) {
      pData.worked_solutions = pData.worked_solutions.reduce((acc, cur) => {
        if (cur.type === "is_final_answer") {
          acc.push(...pData.final_answer);
        } else {
          acc.push(cur);
        }
        return acc;
      }, []);
    }
  }, [pData]);

  if (!pData) {
    return <div>Something went wrong (⊙_⊙;)</div>;
  }
  return (
    <div>
      {pData.content && (
        <ContentContainer
          contentList={pData.content}
          singleSubmit={pData.singleSubmit}
          uniqueKey={`part${pIndex}`}
        />
      )}

      {/* Old Structure
      {pData.statement && <p>{parseEquations(pData.statement)}</p>}
      */}

      {[
        "isMaple",
        "final_answer",
        "worked_solutions",
        "structured_tutorial",
      ].reduce((acc, cur) => pData[cur] !== undefined || acc, false) && (
        <HelpButton onClick={toggleAnswerHelp} />
      )}
      {showAnswerHelp && <AnswerHelp pData={pData} />}
    </div>
  );
};

Part.propTypes = {
  pData: PropTypes.object.isRequired,
  pIndex: PropTypes.number.isRequired,
};
