import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricsCard = ({ title, value, subtitle, icon, trend, trendValue, variant = 'default' }) => {
  const variantStyles = {
    default: 'bg-card border-border',
    success: 'bg-success/5 border-success/20',
    warning: 'bg-warning/5 border-warning/20',
    danger: 'bg-destructive/5 border-destructive/20',
  };

  const iconColors = {
    default: 'var(--color-primary)',
    success: 'var(--color-success)',
    warning: 'var(--color-warning)',
    danger: 'var(--color-destructive)',
  };

  return (
    <div className={`${variantStyles?.[variant]} border rounded-lg p-4 md:p-6 transition-smooth hover-lift`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <p className="caption text-muted-foreground mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground">
            {value}
          </h3>
        </div>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center ${variant === 'default' ? 'bg-primary/10' : `bg-${variant}/10`}`}>
          <Icon name={icon} size={20} color={iconColors?.[variant]} />
        </div>
      </div>
      {subtitle && (
        <p className="text-xs md:text-sm text-muted-foreground mb-2">{subtitle}</p>
      )}
      {trend && trendValue && (
        <div className="flex items-center gap-2">
          <Icon 
            name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
            size={16} 
            color={trend === 'up' ? 'var(--color-success)' : 'var(--color-destructive)'}
          />
          <span className={`text-xs md:text-sm font-medium ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
            {trendValue}
          </span>
          <span className="text-xs text-muted-foreground">vs last month</span>
        </div>
      )}
    </div>
  );
};

export default MetricsCard;