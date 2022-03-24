import { useState } from "react";
import PropTypes from "prop-types";

import StepByStepNav from "components/StepByStepNav";

import ContentContainer from "components/ContentContainer";

export const StructuredTutorial = ({ data }) => {
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
    <div className="structured-tutorial-container">
      <div className="structured-tutorial">
        {/* {data.slice(0, showUpTo).map((item, i) => (
          <div className={styles["ws-step"]} key={i}>
            {item.text && <p className={text}>{parseEquations(item.text)}</p>}
            {item.equation && <Math tex={item.equation} />}
            {item.media && <InsertMedia data={item.media} />}
            {item.h5p_link && (
          <>
          <iframe
          title="Structured Tutorial"
          src={item.h5p_link}
          width="1090"
          height="713"
          frameBorder="0"
          allowFullscreen="allowfullscreen"
          ></iframe>
          <script
          src="https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js"
          charSet="UTF-8"
          ></script>
          </>
            )}
          </div>
        ))} */}
        <ContentContainer
          contentList={data.slice(0, showUpTo)}
          uniqueKey={`st`}
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

StructuredTutorial.propTypes = {
  data: PropTypes.array.isRequired,
};
