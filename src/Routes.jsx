import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";

import AuthenticationLogin from './pages/authentication-login';

const Routes = () => {
  return (
<HashRouter>
  <RouterRoutes>
    <Route path="/" element={<AuthenticationLogin />} />
  </RouterRoutes>
</HashRouter>

  );
};

export default Routes;
