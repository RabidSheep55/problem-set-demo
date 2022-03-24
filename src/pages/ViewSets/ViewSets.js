import { useState, useEffect, useContext } from "react";

import { AuthTokenContext } from "auth/AuthTokenContext";
// import { getAccessToken } from "auth/getAccessToken";
import { useMsal } from "@azure/msal-react";

import { Link } from "react-router-dom";
import { SetCard } from "./components/SetCard";

import Loading from "components/Loading";

import styles from "./styles/ViewSets.module.css";

export const ViewSets = () => {
  const authToken = useContext(AuthTokenContext);
  const { accounts } = useMsal();

  const [apiResponse, setApiResponse] = useState({});
  const [apiError, setApiError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [re, setRe] = useState(); // Used to re-trigger fetch

  // On load fetch valid sets
  useEffect(() => {
    setIsLoading(true);
    setApiResponse({});
    setApiError(null);

    const headers = new Headers();
    // const accessToken = (async () =>
    //   await getAccessToken(instance, accounts[0]))();
    headers.append("Authorization", "Bearer " + authToken);

    const options = {
      mode: "cors",
      method: "GET",
      headers: headers,
    };

    fetch(
      process.env.REACT_APP_SHEETS_API_URL +
        `courses/mech50010_fluid_mechanics`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setApiResponse(data);
        setIsLoading(false);
        setApiError(false);
      })
      .catch((error) => {
        console.log(error);
        setApiError(error);
        setIsLoading(false);
      });
  }, [authToken, re]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{apiResponse.name} Sets</h1>
      <p className={styles.description}>
        Access all the problem sets that have been assigned to
        {accounts && <span> {accounts[0].name}</span>}
      </p>
      {apiResponse.sets && (
        <div className={styles.cardsContainer}>
          {apiResponse.sets
            .sort((a, b) => (parseInt(a.number) <= parseInt(b.number) ? -1 : 1))
            .map((e, i) => (
              <Link to={`/set/${e._id}`} className={styles.card} key={e._id}>
                <SetCard
                  title={e.name}
                  number={e.number}
                  description={e.description}
                  isCompleted={e.is_complete}
                />
              </Link>
            ))}
        </div>
      )}
      {isLoading && <Loading text="Fetching Your Problem Sets" />}
      {apiError && (
        <div className={styles.errorContainer}>
          <p className={styles.error}>
            Fetch to the Problem Sets DB failed...If this keeps happening please
            contact your lecturer.
          </p>
          <button
            className={styles.reload}
            onClick={() => setRe((prev) => !prev)}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
};
