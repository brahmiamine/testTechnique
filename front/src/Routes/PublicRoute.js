import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../Auth/useUser";

/**
 * The PublicRoute component renders its children if the user is not logged in, otherwise it redirects to the home page.
 * @returns The code is returning either the `<Navigate to="/" />` component if the `user` is truthy, or the `children` prop otherwise.
 */
function PublicRoute({ children }) {
  const user = useUser();
  return user ? <Navigate to="/" /> : children;
}

export default PublicRoute;
