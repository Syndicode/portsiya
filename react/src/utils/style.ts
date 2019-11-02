type TClassName = string | undefined | null | boolean;
type TStyleRule = object | undefined | null | boolean;

export const classNames = (...classNamesArr: TClassName[]): string => {
  return classNamesArr.filter(Boolean).join(" ");
};

export const styleRules = (...styleRulesArr: TStyleRule[]): object => {
  return styleRulesArr
    .filter(Boolean)
    .reduce((acc: object, next: TStyleRule) => Object.assign(acc, next), {});
};
