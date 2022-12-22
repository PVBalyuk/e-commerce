import { FC } from "react";
import WelcomeContent from "./components/welcome-content/welcome-content";
import classes from "./home-page-intro.module.scss";

const HomePageIntro: FC = () => {
  return (
    <div className={classes.wrapper}>
      <WelcomeContent />
    </div>
  );
};

export default HomePageIntro;
