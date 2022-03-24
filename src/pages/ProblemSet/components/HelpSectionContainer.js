import PropTypes from "prop-types";

import { EquationHelp } from "./help_sections/EquationHelp";
import { FinalAnswer } from "./help_sections/FinalAnswer";
import { WorkedSolutions } from "./help_sections/WorkedSolutions";
import { StructuredTutorial } from "./help_sections/StructuredTutorial";

export const HelpSectionContainer = (props) => {
  if (!props.data) {
    return <div>Something went wrong :/</div>;
  }
  switch (props.type) {
    case "eqh":
      return <EquationHelp />;
    case "final_answer":
      return <FinalAnswer data={props.data} />;
    case "worked_solutions":
      return <WorkedSolutions data={props.data} />;
    case "structured_tutorial":
      return <StructuredTutorial data={props.data} />;
    default:
      return <div>There was an error with loading {props.type}</div>;
  }
};

HelpSectionContainer.propTypes = {
  type: PropTypes.oneOf([
    "eqh",
    "final_answer",
    "worked_solutions",
    "structured_tutorial",
  ]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};
