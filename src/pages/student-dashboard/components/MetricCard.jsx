import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  trend, 
  trendValue, 
  status = 'normal',
  onClick 
}) => {
  const statusColors = {
    normal: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    critical: 'bg-destructive/10 text-destructive'
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground'
  };

  return (
    <div 
      className={`bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border transition-smooth hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg ${statusColors?.[status]} flex items-center justify-center`}>
          <Icon name={icon} size={20} className="md:w-6 md:h-6" />
        </div>
        {trend && trendValue && (
          <div className={`flex items-center gap-1 caption ${trendColors?.[trend]}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={16} />
            <span className="font-medium">{trendValue}</span>
          </div>
        )}
      </div>
      <h3 className="text-2xl md:text-3xl font-heading font-semibold text-foreground mb-1">
        {value}
      </h3>
      <p className="caption text-muted-foreground mb-1">{title}</p>
      {subtitle && (
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default MetricCard;