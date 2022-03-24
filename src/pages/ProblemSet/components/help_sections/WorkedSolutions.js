import { useState } from "react";
import PropTypes from "prop-types";

import StepByStepNav from "components/StepByStepNav";

import ContentContainer from "components/ContentContainer";

export const WorkedSolutions = ({ data }) => {
  const [showUpTo, setShowUpTo] = useState(1);
  const increment = () => {
    setShowUpTo((prev) => (prev < data.length ? prev + 1 : prev));
  };

  const decrement = () => {
    setShowUpTo((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const showAll = () => {
    setShowUpTo(data.length);
  };

  return (
    <div className="worked-solutions-container">
      <div className="worked-solutions">
        {/* {data.slice(0, showUpTo).map((item, i) => (
          <div className="ws-step" key={i}>
            {item.text && <p className={text}>{parseEquations(item.text)}</p>}
            {item.equation && <Math tex={item.equation} />}
            {item.media && <InsertMedia data={item.media} />}
          </div>
        ))} */}
        <ContentContainer
          contentList={data.slice(0, showUpTo)}
          uniqueKey={`ws`}
        />
      </div>
      {data.length > 1 && (
        <StepByStepNav
          decrement={decrement}
          increment={increment}
          showAll={showAll}
          showUpTo={showUpTo}
          contentLength={data.length}
        />
      )}
    </div>
  );
};

WorkedSolutions.propTypes = {
  data: PropTypes.array.isRequired,
};
