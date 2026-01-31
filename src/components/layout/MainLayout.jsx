import React from 'react';
import Header from '../navigation/Header';

const MainLayout = ({ children, userRole = 'student', userName = 'User' }) => {
  return (
    <div className="min-h-screen bg-background">
      <Header userRole={userRole} userName={userName} />
      <main className="pt-16">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;