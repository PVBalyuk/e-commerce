import { useState } from "react";
import { Modal } from "src/components";
import RegistrationForm from "src/components/registration-form/registration-form";
import Box from "src/ui-kit/box/box";

const SignUp = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);

  const openHandler = () => setIsModalOpened(true);
  const closeHandler = () => setIsModalOpened(false);

  return (
    <>
      <Box
        onClick={() => {
          openHandler();
        }}
      >
        Sign Up
      </Box>
      <Modal
        isModalOpened={isModalOpened}
        closeModal={closeHandler}
        openModal={openHandler}
      >
        <RegistrationForm closeModal={closeHandler} />
      </Modal>
    </>
  );
};

export default SignUp;
