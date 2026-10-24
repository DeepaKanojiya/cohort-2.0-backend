import React from "react";
import FaceExpression from "./features/Expressions/components/FaceExpression";
import { RouterProvider } from "react-router-dom";
import { router } from "./app.route";
import "././features/shared/style/global.scss";
import { AuthProvider } from "./features/auth/auth.context";
import { SongContextProvider } from "./features/home/song.context";

function App() {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router} />
      </SongContextProvider>
    </AuthProvider>
  );
}

export default App;
