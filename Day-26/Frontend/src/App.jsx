import React from "react";
import FaceExpression from "./features/Expressions/components/FaceExpression";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.route";
import "././features/shared/style/global.scss";
import { AuthProvider } from "./features/auth/auth.context";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
