import PropTypes from "prop-types";

// https://www.npmjs.com/package/mathjax-react
// import { MathComponent } from "mathjax-react";

// export const Math = ({ tex, inline = false }) => {
//   return <MathComponent tex={tex} display={!inline} />;
// };

// https://www.npmjs.com/package/better-react-mathjax
// import { MathJax } from "better-react-mathjax";

// export const Math = ({ tex, inline = false }) => {
//   return (
//     <MathJax
//       inline={inline}
//       text={tex}
//       typesettingOptions={{ fn: "tex2mml" }}
//       renderMode="pre"
//     ></MathJax>
//   );
// };

// https://www.npmjs.com/package/react-mathjax
import MathJax from "react-mathjax";

export const Math = ({ tex, inline = false }) => {
  return <MathJax.Node inline={inline} formula={tex} />;
};

Math.propTypes = {
  tex: PropTypes.string.isRequired,
  inline: PropTypes.bool,
};
