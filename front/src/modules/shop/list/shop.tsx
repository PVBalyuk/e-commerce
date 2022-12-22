import { FC } from "react";
import PageContainer from "src/ui-kit/page-container/page-container";
import { Content, Filters } from "./components";
import classes from "./shop.module.scss";

const Shop: FC = () => {
  return (
    <PageContainer>
      <div className={classes.container}>
        <Filters />
        <Content />
      </div>
    </PageContainer>
  );
};

export default Shop;
