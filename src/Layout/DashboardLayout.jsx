import { useContext } from "react";
import Navbar from "../Pages/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";

const DashboardLayout = () => {
  const { employeeInfo } = useContext(AuthContext);

  let menus;

  if (employeeInfo?.role === "admin") {
    menus = (
      <>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <a>Add Employee</a>
        </li>
        <li>
          <a>Employees</a>
        </li>
      </>
    );
  } else if (employeeInfo?.role === "employee") {
    <>
      <li>
        <a>Sidebar Item 1</a>
      </li>
      <li>
        <a>Sidebar Item 2</a>
      </li>
    </>;
  }

  return (
    <>
      {/* navbar  */}
      <Navbar />

      {/* drawer */}
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}

          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button lg:hidden"
          >
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            {menus}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
