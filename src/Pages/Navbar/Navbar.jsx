import Nav from "./Navbar.module.css";
import Logo from "../../assets/Logo/logo.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCoffee,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  return (
    <div className={`${Nav.container}`}>
      {/* upper part  */}
      <div className={`${Nav.upper} flex items-center justify-between mb-2`}>
        <div className={`${Nav.logo} basis-1/2 flex items-center`}>
          <img src={Logo} alt="Logo" />

          {/* company name  */}
          <div className="flex flex-col ml-2">
            <p className="font-bold text-2xl">SDS</p>
            <span className="text-sm text-gray-400">Consultancy Service</span>
          </div>
        </div>

        <div className="flex justify-between basis-1/2">
          {/* call info  */}
          <div className="flex">
            <div className="mr-2">
              <FontAwesomeIcon icon={faPhone} />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-sm">Call</p>
              <span className="text-xs mt-1 text-gray-500">+44-7689789898</span>
            </div>
          </div>

          {/* work time info  */}
          <div className="flex ">
            <div className="mr-2">
              <FontAwesomeIcon icon={faClock} />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-sm">Work Time</p>
              <span className="text-xs mt-1 text-gray-500">
                Mon-Fri 8AM -5PM
              </span>
            </div>
          </div>

          {/* address info  */}
          <div className="flex">
            <div className="mr-2">
              <FontAwesomeIcon icon={faLocationDot} />
            </div>
            <div className="flex flex-col">
              <p className="font-bold text-sm">Address</p>
              <span className="text-xs mt-1 text-gray-500">
                Franklin st. Avenue
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr />

      {/* bottom part  */}

      <div>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Courses</a>
          </li>
          <li>
            <a href="#">About us</a>
          </li>
        </ul>

        <div>
          <button>LogIn</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
