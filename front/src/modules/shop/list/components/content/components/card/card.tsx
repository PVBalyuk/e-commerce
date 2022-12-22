import { FC } from "react";
import classes from "./card.module.scss";
import { Image, AddToCartButton, Info, Price } from "./components";

const Card: FC = () => {
  return (
    <div className={classes.container}>
      <Image />
      <Info />
      <Price />
      <AddToCartButton />
    </div>
  );
};

export default Card;
