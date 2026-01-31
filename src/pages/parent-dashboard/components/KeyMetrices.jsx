import React from 'react';
import Icon from '../../../components/AppIcon';

const KeyMetrics = ({ metrics }) => {
  const getMetricIcon = (type) => {
    switch (type) {
      case 'engagement':
        return { name: 'Activity', color: 'var(--color-primary)' };
      case 'attendance':
        return { name: 'Calendar', color: 'var(--color-secondary)' };
      case 'resources':
        return { name: 'BookOpen', color: 'var(--color-success)' };
      case 'performance':
        return { name: 'TrendingUp', color: 'var(--color-warning)' };
      default:
        return { name: 'BarChart', color: 'var(--color-muted-foreground)' };
    }
  };

  const getTrendIcon = (trend) => {
    if (trend > 0) return { name: 'TrendingUp', color: 'text-success' };
    if (trend < 0) return { name: 'TrendingDown', color: 'text-destructive' };
    return { name: 'Minus', color: 'text-muted-foreground' };
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="BarChart2" size={24} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Key Performance Metrics
          </h3>
          <p className="caption text-muted-foreground">
            Comparative analysis over time
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {metrics?.map((metric) => {
          const iconConfig = getMetricIcon(metric?.type);
          const trendConfig = getTrendIcon(metric?.trend);
          
          return (
            <div
              key={metric?.id}
              className="bg-muted/30 rounded-lg border border-border p-4 md:p-5 hover:shadow-md transition-smooth"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-card rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={iconConfig?.name} size={20} color={iconConfig?.color} />
                </div>
                <div className={`flex items-center gap-1 ${trendConfig?.color}`}>
                  <Icon name={trendConfig?.name} size={16} />
                  <span className="caption font-semibold data-text">
                    {Math.abs(metric?.trend)}%
                  </span>
                </div>
              </div>
              <h4 className="caption text-muted-foreground mb-2">
                {metric?.label}
              </h4>
              <p className="text-2xl md:text-3xl font-bold text-foreground mb-2 data-text">
                {metric?.value}
                <span className="text-base md:text-lg text-muted-foreground ml-1">
                  {metric?.unit}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-smooth"
                    style={{ width: `${metric?.percentage}%` }}
                  />
                </div>
                <span className="caption text-muted-foreground data-text whitespace-nowrap">
                  {metric?.percentage}%
                </span>
              </div>
              <p className="caption text-muted-foreground mt-3 line-clamp-2">
                {metric?.description}
              </p>
            </div>
          );
        })}
      </div>
      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Info" size={18} className="text-muted-foreground flex-shrink-0" />
            <p className="caption text-muted-foreground">
              Metrics are updated daily based on student activity and performance data
            </p>
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth focus-ring caption font-medium flex items-center gap-2 justify-center lg:justify-start">
            <Icon name="Download" size={18} />
            <span>Export Report</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyMetrics;