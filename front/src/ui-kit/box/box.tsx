import { FC, ReactNode } from "react";
import classes from "./box.module.scss";

interface IProps {
  onClick?: () => void;
  children?: ReactNode;
}

const Box: FC<IProps> = ({ children, onClick }) => {
  return (
    <div onClick={onClick} className={classes.box}>
      {children}
    </div>
  );
};

export default Box;
