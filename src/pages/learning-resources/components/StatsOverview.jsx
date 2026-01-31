import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = ({ stats }) => {
  const statCards = [
    {
      label: 'Total Resources',
      value: stats?.totalResources,
      icon: 'BookOpen',
      color: 'primary'
    },
    {
      label: 'In Progress',
      value: stats?.inProgress,
      icon: 'PlayCircle',
      color: 'warning'
    },
    {
      label: 'Completed',
      value: stats?.completed,
      icon: 'CheckCircle',
      color: 'success'
    },
    {
      label: 'Bookmarked',
      value: stats?.bookmarked,
      icon: 'Bookmark',
      color: 'secondary'
    }
  ];

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary',
      warning: 'bg-warning/10 text-warning',
      success: 'bg-success/10 text-success',
      secondary: 'bg-secondary/10 text-secondary'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
      {statCards?.map((stat, index) => (
        <div 
          key={index}
          className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-smooth"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(stat?.color)}`}>
              <Icon name={stat?.icon} size={20} />
            </div>
          </div>
          <p className="data-text text-2xl md:text-3xl font-semibold text-foreground mb-1">
            {stat?.value}
          </p>
          <p className="caption text-muted-foreground">
            {stat?.label}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;