import React from 'react';
import Icon from '../../../components/AppIcon';

const StudentOverviewCard = ({ studentData }) => {
  const getRiskColor = (level) => {
    switch (level) {
      case 'Normal':
        return 'bg-success/10 text-success border-success/20';
      case 'Warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Critical':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getRiskIcon = (level) => {
    switch (level) {
      case 'Normal':
        return 'CheckCircle2';
      case 'Warning':
        return 'AlertTriangle';
      case 'Critical':
        return 'AlertCircle';
      default:
        return 'Info';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 md:gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="User" size={24} color="var(--color-primary)" />
            </div>
            <div className="min-w-0">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-heading font-semibold text-foreground truncate">
                {studentData?.name}
              </h2>
              <p className="caption text-muted-foreground">
                {studentData?.studentId} • {studentData?.program}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            <div className="bg-muted/50 rounded-lg p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Calendar" size={16} className="text-muted-foreground" />
                <span className="caption text-muted-foreground">Attendance</span>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-foreground data-text">
                {studentData?.attendance}%
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 md:p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                <span className="caption text-muted-foreground">Avg Score</span>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-foreground data-text">
                {studentData?.averageScore}%
              </p>
            </div>

            <div className="bg-muted/50 rounded-lg p-3 md:p-4 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Activity" size={16} className="text-muted-foreground" />
                <span className="caption text-muted-foreground">Engagement</span>
              </div>
              <p className="text-xl md:text-2xl font-semibold text-foreground data-text">
                {studentData?.engagementScore}/100
              </p>
            </div>
          </div>
        </div>

        <div className={`${getRiskColor(studentData?.riskLevel)} rounded-lg border p-4 md:p-5 lg:p-6 lg:min-w-[240px]`}>
          <div className="flex items-center gap-3 mb-3">
            <Icon name={getRiskIcon(studentData?.riskLevel)} size={24} />
            <span className="font-semibold text-base md:text-lg">Academic Status</span>
          </div>
          <p className="text-2xl md:text-3xl font-heading font-bold mb-2">
            {studentData?.riskLevel}
          </p>
          <p className="caption opacity-90 line-clamp-2">
            {studentData?.riskDescription}
          </p>
        </div>
      </div>
      <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4">
          <div className="flex items-center gap-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="caption text-muted-foreground">
              Last Updated: {studentData?.lastUpdated}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Icon name="LogIn" size={16} className="text-muted-foreground" />
            <span className="caption text-muted-foreground">
              LMS Logins: {studentData?.lmsLogins} this week
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentOverviewCard;