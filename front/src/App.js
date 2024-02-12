import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./Pages/Login";
import PrivateRoute from "./Routes/PrivateRoute";
import PublicRoute from "./Routes/PublicRoute";
import Register from "./Pages/Register";
import MessageLayout from "./Layouts/MessageLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <PrivateRoute>
              <MessageLayout />
            </PrivateRoute>
          }
        />
        <Route
          path="/login"
          exact
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          exact
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
