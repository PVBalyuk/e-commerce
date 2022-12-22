import { FC, memo, ReactNode, useMemo, useEffect } from "react";
import { createPortal } from "react-dom";
import classes from "./modal.module.scss";

interface IProps {
  children: ReactNode;
  isModalOpened: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const modalRootElement = document.getElementById("portal");

const Modal: FC<IProps> = ({ children, closeModal, isModalOpened }) => {
  const element = useMemo(() => document.createElement("div"), []);

  useEffect(() => {
    if (isModalOpened) {
      modalRootElement?.appendChild(element);

      return () => {
        modalRootElement?.removeChild(element);
      };
    }
  }, [element, isModalOpened]);
  if (!isModalOpened) {
    return null;
  }

  return createPortal(
    <div
      className={`${classes.modalBackground} ${
        isModalOpened ? classes.active : ""
      }`}
      onClick={closeModal}
    >
      <div onClick={(e) => e.stopPropagation()} className={classes.modalCard}>
        <div onClick={closeModal} className={classes.cross}></div>
        {children}
      </div>
    </div>,
    element
  );
};

export default memo<IProps>(Modal);
