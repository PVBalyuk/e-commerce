import { FC } from "react";
import { Card } from "./components";
import classes from "./content.module.scss";

const Content: FC = () => {
  return (
    <div className={classes.container}>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </div>
  );
};

export default Content;
