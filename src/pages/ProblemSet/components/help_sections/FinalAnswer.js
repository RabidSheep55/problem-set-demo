import PropTypes from "prop-types";

import ContentContainer from "components/ContentContainer";

export const FinalAnswer = ({ data }) => {
  return (
    <div className="final-answer">
      {Array.isArray(data) ? (
        <ContentContainer contentList={data} uniqueKey={`fa`} />
      ) : (
        <>
          <div>Warning: this still uses the old content method!</div>
          <p>{JSON.stringify(data)}</p>
        </>
      )}
    </div>
  );
};

FinalAnswer.propTypes = {
  data: PropTypes.array.isRequired,
};
