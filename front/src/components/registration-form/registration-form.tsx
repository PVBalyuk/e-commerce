import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "./schema";
import { IRegistrationSchema } from "./types";
import classes from "./registration-form.module.scss";
import { enGb } from "src/core/constants/constants";
import Input from "src/ui-kit/input/input";
import SubmitButton from "src/ui-kit/submit-button/submit-button";
import { useRegister } from "./use-register";

interface IProps {
  closeModal: () => void;
}

const RegistrationForm: FC<IProps> = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationSchema>({
    resolver: yupResolver(registrationSchema),
  });
  const { mutateAsync: registerUser, isLoading } = useRegister({ closeModal });

  const submitHandler: SubmitHandler<IRegistrationSchema> = async (data) => {
    await registerUser(data);
  };

  return (
    <form id="registration" onSubmit={handleSubmit(submitHandler)}>
      <div className={classes.inputs}>
        <Input
          label={enGb.USERNAME}
          error={errors.userName?.message}
          name="userName"
          register={register}
        />
        <Input
          label={enGb.EMAIL}
          error={errors.email?.message}
          name="email"
          register={register}
        />
        <Input
          label={enGb.PHONE_NUMBER}
          error={errors.phoneNumber?.message}
          register={register}
          name="phoneNumber"
        />
        <Input
          label={enGb.PASSWORD}
          error={errors.password?.message}
          name="password"
          register={register}
        />
      </div>
      <SubmitButton
        disabled={isLoading}
        onClick={handleSubmit(submitHandler)}
        text={enGb.REGISTER}
      />
    </form>
  );
};

export default RegistrationForm;
