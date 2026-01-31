import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AuthenticationLogin from './pages/authentication-login';
import StudentDataInput from './pages/student-data-input';
import MentorDashboard from './pages/mentor-dashboard';
import ParentDashboard from './pages/parent-dashboard';
import StudentDashboard from './pages/student-dashboard';
import LearningResources from './pages/learning-resources';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationLogin />} />
        <Route path="/authentication-login" element={<AuthenticationLogin />} />
        <Route path="/student-data-input" element={<StudentDataInput />} />
        <Route path="/mentor-dashboard" element={<MentorDashboard />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/learning-resources" element={<LearningResources />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;