import PropTypes from "prop-types";

import styles from "../styles/AnswerNavButton.module.css";

const btnsInfo = {
  eqh: {
    className: styles.eqh,
    innerText: "Equation Help",
  },
  structured_tutorial: {
    className: styles.st,
    innerText: "Structured Tutorial",
    tippyText: `An instructor-led video working through the problem, auto-pausing when it's your turn to work.
                Good if you don't know where to start, or are stuck half-way through.`,
  },
  final_answer: {
    className: styles.fa,
    innerText: "Show Answer",
    tippyText: `Check your own answer before revealing the answer.
                Revealing the answer takes away the chance to get it right yourself.`,
  },
  worked_solutions: {
    className: styles.ws,
    innerText: "Worked Solutions",
    tippyText: `Only view worked solutions after making your best independent attempt. Seeing solutions ruins the learning opportunity.
                If you are stuck half-way, try (hard!) to only reveal necessary steps before continuing independently.`,
  },
};

export const AnswerNavButton = ({ btnFor, onClick, isOpen }) => {
  const handleClick = ({ target }) => {
    onClick(target.dataset.btnfor);
  };

  return (
    <button
      className={[
        styles.navButton,
        btnsInfo[btnFor].className,
        isOpen ? styles.open : null,
      ].join(" ")}
      onClick={handleClick}
      data-btnfor={btnFor}
    >
      {btnsInfo[btnFor].innerText}
    </button>
  );
};

AnswerNavButton.propTypes = {
  btnFor: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
};
