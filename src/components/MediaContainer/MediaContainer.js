import { useContext } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";

// Not sure if importing from a page component is allowed
import { SetIdContext } from "pages/ProblemSet/ProblemSet";

import styles from "./MediaContainer.module.css";

const linkPattern = /^https?:\/\//;
const imagePattern = /\.(?:png|jpg)$/i;
const msStreamPattern = /microsoftstream/;

export const MediaContainer = ({ data }) => {
  const setId = useContext(SetIdContext);

  // Identify which component to render each item with
  const putMediaComponent = (item) => {
    // If the item isn't a link, it must be a file saved to the associated sheet's bucket
    if (!linkPattern.test(item)) {
      item = `https://d3u26w83lr4fr.cloudfront.net/media/${setId}/${item}`;
    }

    // Return the appropriate component based on file type
    if (imagePattern.test(item)) {
      return (
        <div className={styles.imageContainer}>
          <img
            className={styles.image}
            alt={item.split("/").slice(-1)}
            src={item}
          ></img>
        </div>
      );
    }

    // ReactPlayer doesn't seem to support MS Stream videos
    if (msStreamPattern.test(item)) {
      return (
        <iframe
          src={item}
          allowFullScreen
          title="Microsoft Stream Embedded video"
        ></iframe>
      );
    } else {
      return (
        <ReactPlayer
          className={styles.video}
          url={item}
          width="100%"
          height="100%"
        />
      );
    }
  };

  return (
    <div className={styles.container}>
      {data.map((item, ind) => (
        <div className={styles.mediaItem} key={ind}>
          {putMediaComponent(item, ind)}
        </div>
      ))}
    </div>
  );
};

MediaContainer.propTypes = {
  data: PropTypes.array.isRequired,
};
