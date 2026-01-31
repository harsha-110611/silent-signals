import React from 'react';
import Icon from '../../../components/AppIcon';

const RiskIndicator = ({ level = 'normal', insights = [] }) => {
  const riskConfig = {
    normal: {
      label: 'Normal',
      icon: 'CheckCircle2',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20',
      description: 'Your academic performance is on track. Keep up the good work!'
    },
    warning: {
      label: 'Needs Attention',
      icon: 'AlertTriangle',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      borderColor: 'border-warning/20',
      description: 'Some areas need improvement. Review the recommendations below.'
    },
    critical: {
      label: 'Requires Action',
      icon: 'AlertCircle',
      bgColor: 'bg-destructive/10',
      textColor: 'text-destructive',
      borderColor: 'border-destructive/20',
      description: 'Immediate attention needed. Please review the action items carefully.'
    }
  };

  const config = riskConfig?.[level];

  return (
    <div className={`bg-card rounded-lg p-4 md:p-6 shadow-sm border-2 ${config?.borderColor}`}>
      <div className="flex items-start gap-3 md:gap-4 mb-4">
        <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${config?.bgColor} flex items-center justify-center flex-shrink-0`}>
          <Icon name={config?.icon} size={24} className={`md:w-7 md:h-7 ${config?.textColor}`} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
            Academic Status: {config?.label}
          </h3>
          <p className="caption text-muted-foreground">{config?.description}</p>
        </div>
      </div>
      {insights && insights?.length > 0 && (
        <div className="space-y-2 mt-4 pt-4 border-t border-border">
          <h4 className="caption font-medium text-foreground mb-3">AI-Powered Insights:</h4>
          {insights?.map((insight, index) => (
            <div key={index} className="flex items-start gap-2">
              <Icon name="Sparkles" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <p className="caption text-foreground flex-1">{insight}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiskIndicator;