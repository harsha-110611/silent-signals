import React from 'react';

const FormSection = ({ title, description, children, isExpanded = true, onToggle }) => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-4 py-4 md:px-6 md:py-5 flex items-center justify-between hover:bg-muted/50 transition-smooth focus-ring"
        aria-expanded={isExpanded}
      >
        <div className="text-left">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            {title}
          </h3>
          {description && (
            <p className="text-sm md:text-base text-muted-foreground mt-1">
              {description}
            </p>
          )}
        </div>
        <div className={`transition-smooth ${isExpanded ? 'rotate-180' : ''}`}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>
      
      {isExpanded && (
        <div className="px-4 py-4 md:px-6 md:py-5 border-t border-border">
          {children}
        </div>
      )}
    </div>
  );
};

export default FormSection;