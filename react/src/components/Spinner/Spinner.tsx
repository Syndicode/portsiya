import React from "react";
import { classNames } from "utils/style";
import styles from "./Spinner.module.scss";

type SpinnerProps = {
  size: number;
  absolutelyCentered: boolean;
  className: string;
};

const Spinner = (props: SpinnerProps) => {
  const size = { width: `${props.size}px`, height: `${props.size}px` };
  const containerStyle = props.absolutelyCentered ? size : {};
  const containerClass = classNames(
    styles.container,
    props.className,
    props.absolutelyCentered && styles["--absolutely-centered"]
  );

  const spinnerStyle = { ...size };

  return (
    <div className={containerClass} style={containerStyle}>
      <div className={styles.spinner} style={spinnerStyle} />
    </div>
  );
};

Spinner.defaultProps = {
  size: 40,
  absolutelyCentered: false
};

export default Spinner;
