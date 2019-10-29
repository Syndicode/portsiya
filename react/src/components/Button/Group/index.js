import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import styles from "./ButtonWrapper.module.scss";

const propTypes = {
  justify: PropTypes.oneOf(["start", "end", "center", "between", "around"])
    .isRequired,
  divider: PropTypes.bool,
  className: PropTypes.string
};

const defaultProps = {
  justify: "start",
  divider: true
};

function ButtonGroup(props) {
  const className = cn(styles.container, props.className, {
    [styles.center]: props.justify === "center",
    [styles.end]: props.justify === "end",
    [styles.start]: props.justify === "start",
    [styles.between]: props.justify === "between",
    [styles.around]: props.justify === "around"
  });

  return <div className={className}>{props.children}</div>;
}

ButtonGroup.propTypes = propTypes;
ButtonGroup.defaultProps = defaultProps;

export default ButtonGroup;
