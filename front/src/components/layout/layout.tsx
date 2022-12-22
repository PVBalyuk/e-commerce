import { FC, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "src/modules/home-page/components/navbar/navbar";
import Notification from "src/components/notification/notification";
import { useAppDispatch } from "src/store/hooks";
import { getUserStatuses } from "src/store/slices/user-slice";

const Layout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserStatuses());
  }, [dispatch]);
  return (
    <>
      <Navbar />
      <Outlet />
      <Notification />
    </>
  );
};

export default Layout;
