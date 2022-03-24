import PropTypes from "prop-types";

import styles from "../styles/QuestionIcons.module.css";

const iconsInfoStyles = {
  gridTemplateAareas: `"icon_space"
            "guidance"
            "blurb"`,
  borderRadius: "1rem 3rem 1rem 1rem",
  backgroundColor: "#007393",
};

export const QuestionIcons = ({ iconsData }) => {
  const arc = (minutes, r, cx, cy) => {
    const arc = (2 * Math.PI * minutes) / 60;

    const dx = r * Math.sin(arc);
    const dy = r * (1 - Math.cos(arc));
    const flags = minutes < 30 ? "0,1" : "1,1";

    return `M ${cx},${cy - r} a ${r},${r} 90 ${flags} ${dx},${dy}`;
  };

  const ticks = (minutes, r_lb, r_ub, cx, cy) => {
    const arc = (2 * Math.PI * minutes) / 60;

    const x_lb = cx + r_lb * Math.sin(arc);
    const y_lb = cy - r_lb * Math.cos(arc);
    const x_ub = cx + r_ub * Math.sin(arc);
    const y_ub = cy - r_ub * Math.cos(arc);

    return `M ${x_lb},${y_lb} L ${x_ub},${y_ub}`;
  };

  return (
    <div
      className={[
        styles.icons,
        iconsData.statement && styles.icons["with-statement"],
        ].join(" ")}
    >
      <div className={styles["icons-flexbox"]}>
        <svg
          className={[styles.icon, styles["difficulty-rating-svg"]].join(" ")}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="5 5 42 22"
        >
          <text className={styles["skill-text"]} x="26" y="23">
            Skill Level
          </text>
          <polygon
            className={[
              styles.star,
              iconsData.difficulty > 0 && styles.active,
              ].join(" ")}
            points="11,10.74 7.9,20.24 16,14.4 6,14.4 14.1,20.24"
          ></polygon>
          <polygon
            className={[
              styles.star,
              iconsData.difficulty > 1 && styles.active,
              ].join(" ")}
            points="26,10.74 22.9,20.24 31,14.4 21,14.4 29.1,20.24"
          ></polygon>
          <polygon
            className={[
              styles.star,
              iconsData.difficulty > 2 && styles.active,
              ].join(" ")}
            points="41,10.74 37.9,20.24 46,14.4 36,14.4 44.1,20.24"
          ></polygon>
        </svg>
        <svg
          className={styles["par-time-svg"]}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0.5 1 24.5 24"
        >
          <circle
            className={styles.clock}
            id="clock-circle"
            cx="13"
            cy="13"
            r="10"
          ></circle>
          <path
            className={[styles.clock, styles.lb].join(" ")}
            d={arc(iconsData.par_time[0], 10, 13, 13)}
          ></path>
          <path
            className={[styles.clock, styles.ub].join(" ")}
            d={arc(iconsData.par_time[1], 10, 13, 13)}
          ></path>
          <text className={styles.number} x="13" y="13">
            {iconsData.par_time[0]}-{iconsData.par_time[1]}
          </text>
          <text className={styles.mins} x="13" y="15.5">
            mins
          </text>
          {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((e, i) => (
            <path
              className={styles.tick}
              d={ticks(e, 7.5, 8, 13, 13)}
              key={i}
            ></path>
          ))}
        </svg>
      </div>
      {iconsData.statement && (
        <div
          className={[
            styles["icons-info"],
            iconsData.statement && styles["with-statement"],
            ].join(" ")}
          style={iconsInfoStyles}
        >
          <div className={[styles.icon, styles.guidance].join(" ")}>
            Guidance
          </div>
          <div className={[styles.icon, styles["icon-space"]].join(" ")}></div>
          <div className={[styles.icon, styles.blurb].join(" ")}>
            {iconsData.statement}
          </div>
        </div>
      )}
    </div>
  );
};

QuestionIcons.propTypes = {
  iconsData: PropTypes.object.isRequired,
};
