// TODO: Move this component to the `MediaContainer`

import styles from "./H5PContainer.module.css";

export const H5PContainer = ({ src }) => (
  <>
    <iframe
      className={styles.iframe}
      src={src}
      width="100%"
      height="100%"
      frameBorder="0"
      allowFullScreen="allowfullscreen"
      title="H5P Embedded video"
    ></iframe>
    <script
      src="https://h5p.org/sites/all/modules/h5p/library/js/h5p-resizer.js"
      charSet="UTF-8"
    ></script>
  </>
);
