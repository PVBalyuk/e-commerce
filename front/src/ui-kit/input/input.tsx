import { FC } from "react";
import { UseFormRegister } from "react-hook-form";
import Label from "../label/label";
import classes from "./input.module.scss";

interface IProps {
  register: UseFormRegister<any>;
  name: string;
  error?: string;
  label?: string;
  type?: "input" | "file" | "password";
  multiple?: boolean;
}

const Input: FC<IProps> = ({
  register,
  name,
  error,
  label,
  type = "input",
  multiple = true,
}) => {
  return (
    <div className={classes.inputContainer}>
      <Label label={label} />
      <div className={classes.inputWithError}>
        <input
          type={type}
          {...register(name)}
          className={classes.input}
          multiple={multiple}
        />
        {error && <div className={classes.error}>{error}</div>}
      </div>
    </div>
  );
};

export default Input;
