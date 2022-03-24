import { MathJaxContext } from "better-react-mathjax";

// const config = {
//   "HTML-CSS": {
//     preferredFont: "TeX",
//   },
//   chtml: {
//     scale: 1, // global scaling factor for all expressions
//     minScale: 0.5, // smallest scaling factor to use
//     mtextInheritFont: false, // true to make mtext elements use surrounding font
//     merrorInheritFont: false, // true to make merror text use surrounding font
//     mtextFont: "", // font to use for mtext, if not inheriting (empty means use MathJax fonts)
//     merrorFont: "", // font to use for merror, if not inheriting (empty means use MathJax fonts)
//     unknownFamily: "serif", // font to use for character that aren't in MathJax's fonts
//     mathmlSpacing: false, // true for MathML spacing rules, false for TeX rules
//     skipAttributes: {}, // RFDa and other attributes NOT to copy to the output
//     exFactor: 0.5, // default size of ex in em units
//     displayAlign: "center", // default for indentalign when set to 'auto'
//     displayIndent: "0", // default for indentshift when set to 'auto'
//   },
// };

// export const MathContext = ({ children }) => (
//   <MathJaxContext version={3}>{children}</MathJaxContext>
// );

import MathJax from "react-mathjax";

export const MathContext = ({ children }) => (
  <MathJax.Provider>{children}</MathJax.Provider>
);
