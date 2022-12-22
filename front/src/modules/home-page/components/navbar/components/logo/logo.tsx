import { FC } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./logo.module.scss";

const Logo: FC = () => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate("/")} className={classes.container}>
      E-commerce
    </div>
  );
};

export default Logo;
