import { useState, useEffect, useContext, createContext } from "react";
import { useParams } from "react-router-dom";

import { AuthTokenContext } from "auth/AuthTokenContext";

// Demo and Reference sets
import * as demo_set_data from "utils/sets/demo_set.json";
import * as reference_set_data from "utils/sets/reference_set.json";

// This component only deals with all the data fetching and state
// Layout is all done by the ProblemSetLayout component
import { ProblemSetLayout } from "./components/ProblemSetLayout";

import Loading from "components/Loading";

// Mkes the setId available to deeply nested components
export const SetIdContext = createContext("");

// ProblemSet component
export const ProblemSet = () => {
  // Get the setId from the URL parameter
  const { setId } = useParams();

  // Retrieve an auth token
  const authToken = useContext(AuthTokenContext);

  // Component State (for API data)
  const [setData, setSetData] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch the set data
  useEffect(() => {
    // Reset State
    setIsLoading(true);

    if (setId === "Demo") {
      // Load hardcoded Demo set
      setFetchError(null);
      setIsLoading(false);
      setSetData(demo_set_data.default);
    } else if (setId === "Reference") {
      // Load hardcoded Reference set
      setFetchError(null);
      setIsLoading(false);
      setSetData(reference_set_data.default);
    } else {
      // Fetch set data from the database wrapper
      const headers = new Headers();
      // const bearer = "Bearer " + authToken;
      // headers.append("Authorization", bearer);

      const options = {
        method: "GET",
        mode: "cors",
        headers: headers,
      };

      fetch(process.env.REACT_APP_SHEETS_API_URL + `sets/${setId}`, options)
        .then((res) => {
          if (!res.ok) {
            setFetchError({
              error: {
                description: res.statusText,
                statusCode: res.statusCode,
              },
            });
          } else {
            setFetchError(null);
          }
          return res.json();
        })
        .then((data) => {
          setSetData(data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.dir(error);
          setIsLoading(false);
          setFetchError({
            error: { description: error.message, stack: error.stack },
          });
        });
    }
  }, [setId, authToken]);

  // Error Handling
  if (isLoading) {
    return <Loading text="⚙ Loading Set data... ⚙" />;
  }

  if (fetchError) {
    return (
      <div>
        <p>
          Something went wrong when fetching this set's data:{" "}
          {fetchError?.error?.description}
        </p>
        <p>{JSON.stringify(fetchError)}</p>
        <p>{setData && JSON.stringify(setData)}</p>
      </div>
    );
  }

  if (!setData) {
    return <></>;
  }

  return (
    <SetIdContext.Provider value={setData._id}>
      <ProblemSetLayout setData={setData} />
    </SetIdContext.Provider>
  );
};
