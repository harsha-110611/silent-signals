import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../Appicon';

const Breadcrumb = ({ items = [] }) => {
  const navigate = useNavigate();

  if (!items || items?.length === 0) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center gap-2 flex-wrap">
        {items?.map((item, index) => {
          const isLast = index === items?.length - 1;
          const isClickable = item?.path && !isLast;

          return (
            <li key={index} className="flex items-center gap-2">
              {index > 0 && (
                <Icon 
                  name="ChevronRight" 
                  size={16} 
                  className="text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              {isClickable ? (
                <button
                  onClick={() => handleNavigation(item?.path)}
                  className="caption text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded px-1"
                >
                  {item?.label}
                </button>
              ) : (
                <span 
                  className={`caption ${isLast ? 'text-foreground font-medium' : 'text-muted-foreground'}`}
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item?.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;