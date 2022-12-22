import { FC, ReactNode } from "react";
import classes from "./page-container.module.scss";

interface IProps {
  children?: ReactNode;
}

const PageContainer: FC<IProps> = ({ children }) => {
  return <div className={classes.container}>{children}</div>;
};

export default PageContainer;
