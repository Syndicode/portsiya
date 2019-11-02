import React from "react";
import { classNames } from "utils/style";

import Group from "./Group";
import styles from "./Button.module.scss";

type ButtonProps = {
  type: "button" | "submit";
  variant: "default" | "outline" | "rounded" | "rounded-outline" | "outline-rounded" // prettier-ignore
  mode: "default" | "danger" | "success";
  size: "xs" | "sm" | "md" | "lg";
  isDisabled: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

const Button = (props: ButtonProps) => {
  const onClick = props.isDisabled
    ? (e: React.MouseEvent) => e.preventDefault()
    : props.onClick;

  const className = classNames(
    styles.button,
    props.className,
    props.isDisabled && styles["--disabled"],
    styles[`--variant-${props.variant}`],
    styles[`--mode-${props.mode}`],
    styles[`--size-${props.size}`]
  );

  return (
    <button type={props.type} onClick={onClick} className={className}>
      {props.children}
    </button>
  );
};

Button.Group = Group;
Button.defaultProps = {
  type: "button",
  variant: "default",
  mode: "default",
  size: "md",
  isDisabled: false
};

export default Button;
