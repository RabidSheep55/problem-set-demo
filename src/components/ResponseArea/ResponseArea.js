import {
  useState,
  useEffect,
  useCallback, // For accessing the Authentication JWT
  useContext,
  forwardRef,
  useImperativeHandle,
} from "react";
import PropTypes from "prop-types";

import { AuthTokenContext } from "auth/AuthTokenContext";
import { SetIdContext } from "pages/ProblemSet/ProblemSet";

import Feedback from "components/Feedback";
import SubmitButton from "components/SubmitButton";

import Error from "./types/Error";

import styles from "./ResponseArea.module.css";
import loadingStyles from "styles/LoadingStyles.module.css";

// Import New Response Areas here
import Matrix from "./types/Matrix";
import TrueFalse from "./types/TrueFalse";
import NumberInput from "./types/NumberInput";
import TextInput from "./types/TextInput";
import ExpressionInput from "./types/ExpressionInput";
import MultipleChoice from "./types/MultipleChoice";

// Dictionary relates the rData.type to the component to load
const responseAreaComponents = {
  Matrix: Matrix,
  TrueFalse: TrueFalse,
  NumberInput: NumberInput,
  TextInput: TextInput,
  ExpressionInput: ExpressionInput,
  MultipleChoice: MultipleChoice,
};

let ResponseArea = (
  { rData, elevateResponse, sectionResponses, showSubmitButton },
  ref
) => {
  // Retrieve the authentication token to be passed with every API call
  // const authToken = useContext(AuthTokenContext);

  // Retrieve the set id
  const setId = useContext(SetIdContext);

  // Response object supplied by the particular Response Area
  // Should be overwritten by the response when its loaded using useEffect
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  // How the selected res area (child) lifts state up to the current one
  const updateResponse = useCallback((res) => {
    // Note: res can either be the new value for response, or a custom callback :)
    setResponse(res);
    // Reset the grade, as this is now a new response
    setFeedback(null);
  }, []);

  // Report back the response to PartContent when it changes
  useEffect(() => {
    // Elevate the response up to the PartContent Component
    elevateResponse({ name: rData.name, response: response });

    // Reset the grade
    setFeedback(null);
  }, [rData, elevateResponse, response]);

  // These props are given to the selectedResponseArea
  const selectedResAreaProps = {
    data: rData,
    feedback: feedback, // Res Area might want the grade when it comes back
    handleChange: updateResponse,
  };

  const SelectedResArea = responseAreaComponents[rData.type] || Error;

  const handleSubmit = () => {
    // If the response is empty, no need to do any queries
    if (response === {} || response === "" || response === null) {
      setFeedback({ error: { description: "Please enter a response" } });
      return;
    }

    setIsLoading(true);

    let payload = {
      ...rData,
      set_id: setId,
      response: response,
    };

    // If not standalone, we need to include requirements
    if (rData.requirements) {
      payload = {
        ...payload,
        algorithmFunction: rData.algorithmFunction,
        requirements: Object.fromEntries(
          rData.requirements.map((key) => {
            if (!sectionResponses[key]) {
              setFeedback({
                error: {
                  description: `${key} response is missing, please fill it out`,
                },
              });
            }
            return [key, sectionResponses[key]];
          })
        ),
      };
    }

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    // headers.append("Authentication", "Bearer " + authToken);
    console.log("POSTING THE FOLLOWING REQUEST TO THE GRADING API", payload);

    fetch(process.env.REACT_APP_GRADING_API_URL, {
      method: "POST",
      // crossDomain: true,
      mode: "cors",
      headers: headers,
      body: JSON.stringify({ command: "grade", block: payload }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);
        console.log(data);
        if (data.result) {
          setFeedback(data.result);
        } else {
          setFeedback({
            error: {
              description:
                "No result field in query response. " +
                data?.error?.description,
              level: data?.error?.level,
            },
          });
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setFeedback({ error: { description: `The request failed ${err}` } });
        console.log(err);
      });
  };

  // Bind the handleSubmit to this component, so that it can be called from the parent
  useImperativeHandle(ref, () => ({ handleSubmit: handleSubmit }));

  return (
    <div className={styles.leftBorder}>
      <div className={isLoading ? loadingStyles.add : undefined}>
        <div className={styles.resAreaContainer}>
          <div className={styles["response-area"]}>
            <SelectedResArea {...selectedResAreaProps} />
            {showSubmitButton && (
              <SubmitButton onClick={handleSubmit} isLoading={isLoading} />
            )}
          </div>

          {feedback && <Feedback data={feedback} />}
        </div>
      </div>
    </div>
  );
};

ResponseArea = forwardRef(ResponseArea);
export { ResponseArea };

ResponseArea.propTypes = {
  rData: PropTypes.object.isRequired,

  // Method owned by PartContent, used to 'lift up' the response from this component
  elevateResponse: PropTypes.func.isRequired,

  // If the ResponseArea is not standalone, it needs access to the state of sibling responses when submitting answers
  sectionResponses: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  // If singleSubmit flag is set in PartContent, we don't render one for each ResponseArea
  showSubmitButton: PropTypes.bool.isRequired,
};
