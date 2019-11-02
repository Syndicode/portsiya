import React from "react";
import { classNames } from "utils/style";
import styles from "./ButtonGroup.module.scss";

type ButtonGroupProps = {
  /** controls `justify-content` rule */
  justify: "start" | "end" | "center" | "between" | "around";
  /** margins of child `<button>`s in `px` */
  margins: "5" | "10" | "15" | "20" | "25";
  className?: string;
  children: React.ReactNode;
};

const ButtonGroup = (props: ButtonGroupProps) => {
  const className = classNames(
    styles.container,
    props.className,
    styles[`--justify-${props.justify}`],
    styles[`--margins-${props.margins}`]
  );

  return <div className={className}>{props.children}</div>;
};

ButtonGroup.defaultProps = {
  justify: "start",
  margins: "10"
};

export default ButtonGroup;
