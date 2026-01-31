import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Update Data',
      icon: 'FileInput',
      description: 'Add attendance & exam marks',
      path: '/student-data-input',
      variant: 'default'
    },
    {
      label: 'Learning Resources',
      icon: 'BookOpen',
      description: 'Access study materials',
      path: '/learning-resources',
      variant: 'outline'
    },
    {
      label: 'View Analytics',
      icon: 'BarChart3',
      description: 'Detailed performance analysis',
      onClick: () => {
        document.getElementById('performance-chart')?.scrollIntoView({ behavior: 'smooth' });
      },
      variant: 'outline'
    }
  ];

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border">
      <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-4">
        Quick Actions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions?.map((action, index) => (
          <button
            key={index}
            onClick={() => action?.path ? navigate(action?.path) : action?.onClick?.()}
            className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border hover:border-primary/30 transition-smooth text-left focus-ring"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={action?.icon} size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="caption font-medium text-foreground mb-1">
                {action?.label}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {action?.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;