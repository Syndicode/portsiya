import React from "react";
import styles from "./Tooltip.module.scss";

type TooltipProps = {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

const Tooltip = (props: TooltipProps) => {
  return null;
};

Tooltip.defaultProps = {};

export default Tooltip;
