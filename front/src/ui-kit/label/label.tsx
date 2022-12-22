import { FC } from "react";
import classes from "./label.module.scss";

interface IProps {
  label?: string;
}

const Label: FC<IProps> = ({ label }) => {
  return <div className={classes.label}>{label}</div>;
};

export default Label;
