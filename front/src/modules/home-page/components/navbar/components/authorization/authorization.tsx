import { FC } from "react";
// import { useAppSelector } from "src/store/hooks";
import classes from "./authorization.module.scss";
import { SignIn, SignOut } from "./components";
import SignUp from "./components/sign-up/sign-up";
import { useAppSelector } from "src/store/hooks";
import { DotLoader } from "react-spinners";

const Authorization: FC = () => {
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.user);

  if (isLoading) {
    return (
      <div className={classes.container}>
        <DotLoader size={6} />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {isAuthenticated ? null : <SignUp />}
      {isAuthenticated ? <SignOut /> : <SignIn />}
    </div>
  );
};

export default Authorization;
