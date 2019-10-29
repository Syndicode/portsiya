const filterByPresense = arr => arr.filter(Boolean);

export const classNames = (...classNamesArr) => {
  return filterByPresense(classNamesArr).join(" ");
};

export const styleRules = (...styleRulesArr) => {
  const combineStyles = (acc, next) => ({ ...acc, ...next });
  return filterByPresense(styleRulesArr).reduce(combineStyles, {});
};
