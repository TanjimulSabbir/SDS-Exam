/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // get user info
  let employeeInfo = JSON.parse(localStorage.getItem("Employee-Info"));

  // logout function
  const logOut = () => {
    localStorage.removeItem("Employee-Info");
  };

  const authInfo = { employeeInfo, loading, setLoading, logOut };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
