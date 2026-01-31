import React from 'react';

const AuthDivider = ({ text = 'OR' }) => {
  return (
    <div className="relative my-6 md:my-8">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-border"></div>
      </div>
      <div className="relative flex justify-center">
        <span className="bg-card px-4 caption text-muted-foreground font-medium">
          {text}
        </span>
      </div>
    </div>
  );
};

export default AuthDivider;