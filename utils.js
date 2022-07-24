'use strict';

const testMatch = (uriPatterns, api) => {
  let foundMatch = false;
  uriPatterns.forEach((uriPattern) => {
    const re = new RegExp(uriPattern);
    if (re.test(api)) {
      foundMatch = true;
    }
  });

  return foundMatch;
};

module.exports = { testMatch };
