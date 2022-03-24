import { useState, useCallback, useRef } from "react";
import PropTypes from "prop-types";

import SubmitButton from "components/SubmitButton";

import Text from "components/Text";
import { Math } from "utils/math_rendering/Math";
import ResponseArea from "components/ResponseArea";
import MediaContainer from "components/MediaContainer";
import H5PContainer from "components/H5PContainer";

// General Content Container Component
export const ContentContainer = ({
  contentList,
  uniqueKey,
  singleSubmit = false,
}) => {
  const responseAreaRefs = useRef(Array(contentList.length));

  // State variable keeps track of all child ResponseArea states
  // This is required for linked and algorithmic questions
  const [childResponses, setChildResponses] = useState({});

  // Function is called by ResponseArea when it updates its state
  const storeChildResponse = useCallback((data) => {
    setChildResponses((prev) => ({ ...prev, [data.name]: data.response }));
  }, []);

  // Trigger the handleSubmit function on each of the ResponseAreas in this part
  // For when there is only one submit button
  // ⚠ I SEVERELY DOUBT THIS IS THE RIGHT WAY TO DO THIS ⚠
  const submitAll = () => {
    responseAreaRefs.current.map((resArea) => resArea.handleSubmit());
  };

  // Construct Parts Contents
  const contentComponents = contentList.map((item, i) => {
    switch (item.type) {
      case "text":
        return <Text data={item.data} />;
      case "response_area":
        return (
          <ResponseArea
            rData={item.data}
            ref={(el) => (responseAreaRefs.current[i] = el)}
            elevateResponse={storeChildResponse}
            sectionResponses={!item.data.isStandalone && childResponses}
            showSubmitButton={!singleSubmit}
          />
        );
      case "media":
        return <MediaContainer data={item.data} />;
      case "h5p_link":
        return <H5PContainer src={item.data} />;
      case "latex":
        return <Math tex={item.data} />;
      default:
        if (process.env.NODE_ENV === "development") {
          return (
            <div>
              An Error occured: Item type:{item.type} was unrecognised, block
              data:
              <br />
              <span style={{ fontSize: 10, fontStyle: "italic" }}>
                {JSON.stringify(item)}
              </span>
            </div>
          );
        } else {
          return <></>;
        }
    }
  });

  return (
    <div>
      <div>
        {contentComponents.map((item, index) => (
          <div key={`${uniqueKey}-contentList-${index}`}>{item}</div>
        ))}
      </div>
      {singleSubmit && <SubmitButton onClick={submitAll} isLoading={false} />}
    </div>
  );
};

ContentContainer.propTypes = {
  contentList: PropTypes.array.isRequired,
  uniqueKey: PropTypes.string.isRequired,
  singleSubmit: PropTypes.bool,
};
