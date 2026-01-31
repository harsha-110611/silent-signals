import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ 
  children, 
  allowedRoles = [], 
  userRole = null,
  redirectTo = '/authentication-login' 
}) => {
  if (!userRole) {
    return <Navigate to={redirectTo} replace />;
  }

  if (allowedRoles?.length > 0 && !allowedRoles?.includes(userRole)) {
    const roleRedirects = {
      student: '/student-dashboard',
      parent: '/parent-dashboard',
      mentor: '/mentor-dashboard',
    };
    
    return <Navigate to={roleRedirects?.[userRole] || redirectTo} replace />;
  }

  return children;
};

export default RoleBasedRoute;