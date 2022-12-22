import { FC, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import classes from "./notification.module.scss";
import { hideNotification } from "src/store/slices/notification-slice";

const notificationRootElement = document.getElementById("notification");

const Notification: FC = () => {
  const { isVisible, message, type, timeInspiration } = useAppSelector(
    (state) => state.notification
  );
  const dispatch = useAppDispatch();
  const element = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (isVisible) {
      notificationRootElement?.appendChild(element);
      const timer = setTimeout(
        () => dispatch(hideNotification()),
        timeInspiration
      );
      return () => {
        notificationRootElement?.removeChild(element);
        clearTimeout(timer);
      };
    }
  }, [element, timeInspiration, dispatch, isVisible]);

  if (!isVisible) {
    return null;
  }

  const classname =
    type === "success"
      ? classes.notificationCardSuccess
      : classes.notificationCardDanger;

  return createPortal(
    <div onClick={() => dispatch(hideNotification())} className={classname}>
      {message}
    </div>,
    element
  );
};

export default Notification;
