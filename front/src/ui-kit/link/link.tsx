import { FC } from "react";
import { NavLink } from "react-router-dom";
import classes from "./link.module.scss";

interface IProps {
  title?: string;
  path: string;
}

const Link: FC<IProps> = ({ title, path }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive ? `${classes.link} ${classes.active}` : `${classes.link}`
      }
      to={path}
    >
      {title}
    </NavLink>
  );
};

export default Link;
