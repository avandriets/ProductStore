/**
 * Provides Remove Falsy Values Utility Function.
 */
const removeFalsyValues = (obj) => {

  return Object.keys(obj).reduce((acc, o) => {

    if (obj[o] !== null || obj[o] !== undefined) {
      acc[o] = obj[o];
    }

    return acc;
  }, { });

};

module.exports = removeFalsyValues;
