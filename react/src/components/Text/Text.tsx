import React from "react";
import styles from "./Text.module.scss";

type TextProps = {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

const Text = (props: TextProps) => {
  return null;
};

Text.defaultProps = {};

export default Text;
