import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { AnswerNavButton } from "./AnswerNavButton";
import { HelpSectionContainer } from "./HelpSectionContainer";

import styles from "../styles/AnswerHelp.module.css";

export const AnswerHelp = ({ pData }) => {
  const [openedSection, setOpenedSection] = useState("");

  // Reset the opened section when we switch part
  useEffect(() => {
    setOpenedSection("");
  }, [pData]);

  const selectSection = (sectionId) => {
    setOpenedSection((prev) => (prev !== sectionId ? sectionId : ""));
  };

  return (
    <div className={styles.container}>
      <nav className={styles.navContainer}>
        {pData.isMaple && (
          <AnswerNavButton
            btnFor="eqh"
            onClick={selectSection}
            isOpen={openedSection === "eqh"}
          />
        )}
        {pData.structured_tutorial && (
          <AnswerNavButton
            btnFor="structured_tutorial"
            onClick={selectSection}
            isOpen={openedSection === "structured_tutorial"}
          />
        )}
        {pData.final_answer && (
          <AnswerNavButton
            btnFor="final_answer"
            onClick={selectSection}
            isOpen={openedSection === "final_answer"}
          />
        )}
        {pData.worked_solutions && (
          <AnswerNavButton
            btnFor="worked_solutions"
            onClick={selectSection}
            isOpen={openedSection === "worked_solutions"}
          />
        )}
      </nav>
      {openedSection && (
        <HelpSectionContainer
          type={openedSection}
          data={pData[openedSection]}
        />
      )}
    </div>
  );
};

AnswerHelp.propTypes = {
  pData: PropTypes.object.isRequired,
};
