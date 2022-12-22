import { FC } from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "src/store/hooks";
import classes from "./welcome-content.module.scss";

const WelcomeContent: FC = () => {
  const email = useAppSelector((state) => state.user.email);
  return (
    <div className={classes.container}>
      <h1>Hi {email}! Welcome to the best E-commerce platform</h1>
      <p>Here you can find everything you need</p>
      <p>
        We hope our service can bring you enjoy and happiness. Let's start and
        go to our <Link to="/shop">shop</Link>
      </p>
    </div>
  );
};

export default WelcomeContent;
