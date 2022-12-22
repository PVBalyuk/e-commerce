import { FC, useState } from "react";
import { Modal } from "src/components";
import LoginForm from "src/components/login-form/login-form";
import Box from "src/ui-kit/box/box";

const SignIn: FC = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openHandler = () => setIsModalOpened(true);
  const closeHandler = () => setIsModalOpened(false);

  return (
    <>
      <Box onClick={openHandler}>Sign In</Box>
      <Modal
        isModalOpened={isModalOpened}
        closeModal={closeHandler}
        openModal={openHandler}
      >
        <LoginForm closeModal={closeHandler} />
      </Modal>
    </>
  );
};

export default SignIn;
