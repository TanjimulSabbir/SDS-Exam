import React from "react";

const userExist = () => {
  const employeeInfo = localStorage.getItem("Employee-Info");

  return [employeeInfo];
};

export default userExist;
