import { useContext } from "react";
import { MdDashboard } from "react-icons/md";
import { AiFillProfile } from "react-icons/ai";
import { BsPersonFillAdd, BsFillPeopleFill } from "react-icons/bs";
import Navbar from "../Pages/Navbar/Navbar";
import { Link, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../Context/AuthProvider";
import style from "../Layout/DashboardLayout.module.css";

const DashboardLayout = () => {
  const { employeeInfo } = useContext(AuthContext);

  //   get pathname to highlight active menu
  const pathName = useLocation().pathname;

  let menus;

  if (employeeInfo?.role === "admin") {
    menus = (
      <>
        <li>
          <Link
            to="/dashboard"
            className={pathName === "/dashboard" ? `${style.activeMenu}` : ""}
          >
            <MdDashboard /> Dashboard
          </Link>
        </li>
        <li>
          <Link>
            {" "}
            <AiFillProfile />
            Profile
          </Link>
        </li>
        <li>
          <Link>
            {" "}
            <BsPersonFillAdd /> Add Employee
          </Link>
        </li>
        <li>
          <Link>
            <BsFillPeopleFill /> Employees
          </Link>
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
          <ul
            className={`menu p-4 w-80 h-full bg-[#30b6bc80] text-base-content text-base font-roboto ${style.dashboardMenu}`}
          >
            {/* Sidebar content here */}
            {menus}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
