import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import AuthenticationLogin from './pages/authentication-login';

const Routes = () => {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<AuthenticationLogin />} />
      </RouterRoutes>
    </BrowserRouter>
  );
};

export default Routes;
