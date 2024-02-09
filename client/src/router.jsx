import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Home from "./Pages/Home";
import LoginNew from "./Pages/User/Auth/LoginNew";
import LayoutMain from "./Pages/LayoutMain";
import SettingComp from "./Pages/SettingComp";
import BulkDataCom from "./Pages/BulkData";
import BulkData1 from "./Pages/BulkData1";

const routerAdmin = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/login" element={<LoginNew />}></Route>
      <Route element={<LayoutMain />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/blukData1" element={<BulkDataCom />}></Route>
        <Route path="/blukData2" element={<BulkData1 />}></Route>
      </Route>
    </Route>
  )
);

const RouterCom = () => {
  return (
    <div>
      <RouterProvider router={routerAdmin} />
    </div>
  );
};

export default RouterCom;
