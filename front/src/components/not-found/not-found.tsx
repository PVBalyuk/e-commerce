import { FC } from "react";
import { Link } from "react-router-dom";
import classes from "./not-found.module.scss";

const NotFound: FC = () => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h2>It looks like this page is missing</h2>
        <Link to="/">
          <h4>Navigate to main page(click here)</h4>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
