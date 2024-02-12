import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../Auth/useUser";

/**
 * The PrivateRoute component checks if a user is logged in and renders the children components if they are, otherwise it redirects to the login page.
 * @returns The PrivateRoute component is returning either the children components if there is a user, or a Navigate component with a "to" prop set to
 * "/login" if there is no user.
 */
const PrivateRoute = ({ children }) => {
  const user = useUser();
  return user ? children : <Navigate to="/login" />;
};
export default PrivateRoute;
