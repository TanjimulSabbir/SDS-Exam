/* eslint-disable react/prop-types */
import { AiFillDelete } from "react-icons/ai";
import style from "./Employee.module.css";

const Employee = ({ employee }) => {
  return (
    <>
      <tr className="bg-[#2ecc711a]">
        <td>{employee.name}</td>
        <td>{employee.regId}</td>
        <td>{employee.password}</td>
        <th>
          <button className="btn btn-error btn-sm">
            <AiFillDelete className="text-white" />
          </button>
        </th>
      </tr>
    </>
  );
};

export default Employee;
