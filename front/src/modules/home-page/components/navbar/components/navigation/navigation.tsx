import { FC } from "react";
import Link from "src/ui-kit/link/link";
import classes from "./navigation.module.scss";

const Navigation: FC = () => {
  return (
    <div className={classes.container}>
      <ul className={classes.list}>
        <Link path="/shop" title="Shop" />
        <Link path="/about-us" title="About us" />
        <Link path="/news" title="News" />
        <Link path="/favorites" title="Favorites" />
      </ul>
    </div>
  );
};

export default Navigation;
