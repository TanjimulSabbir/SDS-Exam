import { useQuery } from "@tanstack/react-query";
import Employee from "../Employee/Employee";

const Employees = () => {
  const { data: employees, refetch } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: async () => {
      const response = await fetch(`http://localhost:5000/onlyEmployees`);
      return response.json();
    },
  });

  console.log(employees);
  return (
    <div className="px-16">
      <h1 className="text-center font-roboto text-3xl font-bold my-10">
        Employees
      </h1>

      {/* show employees data as table using list  */}

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className="bg-[#30b6bc4d]">
            <tr className="text-lg font-roboto font-bold text-black">
              <th>Name</th>
              <th>Registration Id</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="font-roboto text-base">
            {employees?.map((employee) => (
              <Employee key={employee._id} employee={employee} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Employees;
