import { CSSProperties, FC, useCallback } from "react";
import { useLogout } from "./use-logout";
import { PulseLoader } from "react-spinners";
import Box from "src/ui-kit/box/box";

const cssOverride: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

const SignOut: FC = () => {
  const { mutateAsync: logout, isLoading } = useLogout();

  const logoutHandler = useCallback(async () => await logout(), [logout]);

  return (
    <>
      <Box onClick={logoutHandler}>Sign Out</Box>
      <PulseLoader
        color="#41eca5"
        loading={isLoading}
        cssOverride={cssOverride}
      />
    </>
  );
};

export default SignOut;
