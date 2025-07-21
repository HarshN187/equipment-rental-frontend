import { createBrowserRouter, Navigate } from "react-router-dom";
import {
  AddAddressPage,
  AddEquipmentPage,
  AddRentalPage,
  AddUserPage,
  CategoryPage,
  Dashboard,
  EquipmentPage,
  Login,
  NotFoundPage,
  RentalsPage,
  UserListPage,
} from "../features";
import { AppLayout, CommonLayout } from "../components";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login></Login>,
  },
  // {
  //   path: "redux",
  //   element: <CounterRedux></CounterRedux>,
  // },
  {
    path: "/",
    element: <AppLayout></AppLayout>,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" />,
      },
      {
        path: "dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "customer",
        element: <CommonLayout></CommonLayout>,
        children: [
          {
            path: "",
            element: <UserListPage></UserListPage>,
          },
          {
            path: "add",
            element: <AddUserPage></AddUserPage>,
          },
          {
            path: "address/add",
            element: <AddAddressPage></AddAddressPage>,
          },
        ],
      },
      {
        path: "equipment",
        element: <CommonLayout></CommonLayout>,
        children: [
          {
            path: "",
            element: <EquipmentPage></EquipmentPage>,
          },
          {
            path: "add",
            element: <AddEquipmentPage></AddEquipmentPage>,
          },
          {
            path: "categories",
            element: <CategoryPage></CategoryPage>,
          },
        ],
      },
      {
        path: "rentals",
        element: <CommonLayout></CommonLayout>,
        children: [
          {
            path: "",
            element: <RentalsPage></RentalsPage>,
          },
          {
            path: "create",
            element: <AddRentalPage></AddRentalPage>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>,
  },
]);

export default router;
