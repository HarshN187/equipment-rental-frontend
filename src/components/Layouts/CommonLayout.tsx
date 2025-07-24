import type React from "react";
import { Outlet } from "react-router-dom";

function CommonLayout(): React.ReactElement<{}> {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
}

export default CommonLayout;
