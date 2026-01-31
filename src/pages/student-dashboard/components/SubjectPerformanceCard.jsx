import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectPerformanceCard = ({ 
  subject, 
  marks, 
  totalMarks, 
  trend, 
  weakTopics = [],
  isWeak = false 
}) => {
  const percentage = ((marks / totalMarks) * 100)?.toFixed(1);
  const grade = percentage >= 90 ? 'A+' : percentage >= 80 ? 'A' : percentage >= 70 ? 'B' : percentage >= 60 ? 'C' : percentage >= 50 ? 'D' : 'F';
  
  const gradeColors = {
    'A+': 'text-success',
    'A': 'text-success',
    'B': 'text-primary',
    'C': 'text-warning',
    'D': 'text-warning',
    'F': 'text-destructive'
  };

  return (
    <div className={`bg-card rounded-lg p-4 md:p-5 shadow-sm border transition-smooth hover:shadow-md ${isWeak ? 'border-warning/30' : 'border-border'}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-semibold text-foreground mb-1 text-base md:text-lg">
            {subject}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="caption text-muted-foreground">
              {marks}/{totalMarks} marks
            </span>
            <span className={`caption font-medium ${gradeColors?.[grade]}`}>
              Grade: {grade}
            </span>
          </div>
        </div>
        {isWeak && (
          <div className="bg-warning/10 text-warning px-2 py-1 rounded caption font-medium flex-shrink-0">
            Needs Focus
          </div>
        )}
      </div>
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-muted-foreground">Performance</span>
          <span className="text-xs font-medium text-foreground">{percentage}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 ${
              percentage >= 70 ? 'bg-success' : percentage >= 50 ? 'bg-warning' : 'bg-destructive'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      {trend && (
        <div className="flex items-center gap-1 caption text-muted-foreground mb-3">
          <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
          <span>Trend: {trend === 'up' ? 'Improving' : 'Declining'}</span>
        </div>
      )}
      {weakTopics && weakTopics?.length > 0 && (
        <div className="pt-3 border-t border-border">
          <p className="text-xs font-medium text-muted-foreground mb-2">Weak Topics:</p>
          <div className="flex flex-wrap gap-1.5">
            {weakTopics?.map((topic, index) => (
              <span 
                key={index}
                className="text-xs bg-muted text-foreground px-2 py-1 rounded"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPerformanceCard;