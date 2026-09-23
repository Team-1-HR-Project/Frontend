import { Outlet } from "react-router-dom";

const HrLayout = () => {
  return (
    <div className="w-full min-w-0">
      <div className="w-full min-w-0 px-6 pb-6">
        <Outlet />
      </div>
    </div>
  );
};

export default HrLayout;
