import classNames from "classnames";
import { FC } from "react";
import { SubmitHandler } from "react-hook-form";
import classes from "./submit-button.module.scss";

interface IProps {
  disabled?: boolean;
  onClick: SubmitHandler<any>;
  text: string;
}

const SubmitButton: FC<IProps> = ({ onClick, disabled = false, text }) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={classNames({
        [classes.button]: !disabled,
        [classes.disabled]: disabled,
      })}
    >
      {text}
    </div>
  );
};

export default SubmitButton;
