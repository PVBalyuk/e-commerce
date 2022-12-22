import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { loginSchema } from "./schema";
import { ILoginSchema } from "./types";
import classes from "./login-form.module.scss";
import Input from "src/ui-kit/input/input";
import { enGb } from "src/core/constants/constants";
import SubmitButton from "src/ui-kit/submit-button/submit-button";
import { CSSProperties, FC } from "react";
import { useLogin } from "./use-login";
import { PulseLoader } from "react-spinners";

const cssOverride: CSSProperties = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
};

interface IProps {
  closeModal: () => void;
}

const LoginForm: FC<IProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const { mutateAsync: loginUser, isLoading } = useLogin({ closeModal });

  const submitHandler: SubmitHandler<ILoginSchema> = async (data) => {
    await loginUser(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className={classes.inputs}>
          <Input
            label={enGb.LOGIN_NAME}
            name="loginName"
            register={register}
            error={errors.loginName?.message}
          />
          <Input
            label={enGb.PASSWORD}
            name="password"
            register={register}
            error={errors.password?.message}
          />
        </div>
        <SubmitButton
          onClick={handleSubmit(submitHandler)}
          text={enGb.LOGIN}
          disabled={isLoading}
        />
      </form>
      <PulseLoader
        color="#41eca5"
        loading={isLoading}
        cssOverride={cssOverride}
      />
    </>
  );
};

export default LoginForm;
