import { FC } from "react";
import Authorization from "./components/authorization/authorization";
import Logo from "./components/logo/logo";
import Navigation from "./components/navigation/navigation";
import classes from "./navbar.module.scss";

const Navbar: FC = () => {
  return (
    <div className={classes.container}>
      <Logo />
      <Navigation />
      <Authorization />
    </div>
  );
};

export default Navbar;
