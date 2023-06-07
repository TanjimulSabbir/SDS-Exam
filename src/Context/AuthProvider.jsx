/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  let employeeInfo = JSON.parse(localStorage.getItem("Employee-Info"));

  const logOut = () => {
    localStorage.removeItem("Employee-Info");
  };

  const authInfo = { employeeInfo, loading, setLoading, logOut };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
