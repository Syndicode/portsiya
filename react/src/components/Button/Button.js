import React from "react";
import PropTypes from "prop-types";
import { classNames } from "utils/style";

import Group from "./Group";
import styles from "./Button.module.scss";

const propTypes = {
  isDisabled: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(["button", "submit"]),
  variant: PropTypes.oneOf(["default", "outline", "rounded", "rounded-outline", "outline-rounded" ]), // prettier-ignore
  mode: PropTypes.oneOf(["default", "danger", "success"]),
  size: PropTypes.oneOf(["xs", "sm", "md", "lg"])
};

const defaultProps = {
  type: "button",
  variant: "default",
  mode: "default",
  size: "md"
};

function Button(props) {
  const onClick = props.isDisabled ? e => e.preventDefault() : props.onClick;

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
}

Button.propTypes = propTypes;
Button.defaultProps = defaultProps;
Button.Group = Group;

export default Button;
