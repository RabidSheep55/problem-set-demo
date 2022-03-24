import { Math } from "./Math";

import Markdown from "markdown-to-jsx";

// Takes in a string, and returns a list of span elements (either text or Math)
export const parseEquations = (text) => {
  const re = /(\\\(.+?\\\)|\\\[.+?\\\])/g;

  /*
    Original Lookbehind Regex (incompatiable with Safari) 
    const eqTest = /(?<=\\\().*(?=\\\))|(?<=\\\[).*(?=\\\])/g;
  */

  const eqTest = /\\\((.*)\\\)|\\\[(.*)\\\]/;

  // if there are no equations, we can allow nonInline markdown
  if (!eqTest.test(text)) {
    return <Markdown children={text} options={{ wrapper: "span" }} />;
  }

  // Parse equations
  const parsed = text.split(re).map((item, ind) => {
    
    if (eqTest.test(item)) {
      
      /*
        Using capturing groups instead of standard match. 
        Therefore finding the first index instead of the zeroth.

        return <Math tex={item.match(eqTest)[0]} inline={item[1] === "("} key={ind} />
      */

      return (
        <Math tex={item.match(eqTest)[1]} inline={item[1] === "("} key={ind} />
      );
    } else {
      return (
        <Markdown children={item} options={{ forceInline: true }} key={ind} />
      );
    }
  });
  return parsed;
};
