/* eslint-disable react/prop-types */
import { AiFillDelete } from "react-icons/ai";

const Employee = ({ employee, handleDeleteEmployee }) => {
  return (
    <>
      <tr className="bg-[#2ecc711a]">
        <td>{employee.name}</td>
        <td>{employee.regId}</td>
        <td>{employee.password}</td>
        <th>
          <button
            className="btn btn-error btn-sm"
            onClick={() => handleDeleteEmployee(employee._id)}
          >
            <AiFillDelete className="text-white" />
          </button>
        </th>
      </tr>
    </>
  );
};

export default Employee;
