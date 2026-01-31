import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StudentDetailsModal = ({ student, onClose }) => {
  if (!student) return null;

  const getRiskBadgeStyles = (risk) => {
    const styles = {
      critical: 'bg-destructive/10 text-destructive border-destructive/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      normal: 'bg-success/10 text-success border-success/20',
    };
    return styles?.[risk] || styles?.normal;
  };

  return (
    <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border p-4 md:p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              Student Details
            </h2>
            <p className="text-sm text-muted-foreground mt-1 data-text">
              {student?.studentId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-smooth"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Engagement Score</p>
              <div className="flex items-center gap-3">
                <span className="text-2xl font-heading font-semibold text-foreground">
                  {student?.engagementScore}%
                </span>
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${student?.engagementScore >= 80 ? 'bg-success' : student?.engagementScore >= 60 ? 'bg-warning' : 'bg-destructive'}`}
                    style={{ width: `${student?.engagementScore}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">Risk Level</p>
              <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border caption font-medium ${getRiskBadgeStyles(student?.riskLevel)}`}>
                <Icon 
                  name={student?.riskLevel === 'critical' ? 'AlertTriangle' : student?.riskLevel === 'warning' ? 'AlertCircle' : 'CheckCircle'} 
                  size={16} 
                />
                {student?.riskLevel?.charAt(0)?.toUpperCase() + student?.riskLevel?.slice(1)}
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
              Weak Subjects
            </h3>
            <div className="flex flex-wrap gap-2">
              {student?.weakSubjects?.map((subject, idx) => (
                <span key={idx} className="px-4 py-2 bg-muted rounded-lg caption text-foreground">
                  {subject}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
              AI-Generated Insights
            </h3>
            <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
              <p className="text-sm text-foreground leading-relaxed">
                {student?.aiInsights}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-3">
              Recommended Interventions
            </h3>
            <div className="space-y-3">
              {student?.recommendations?.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="Lightbulb" size={14} color="var(--color-primary)" />
                  </div>
                  <p className="text-sm text-foreground flex-1">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              iconName="Mail"
              iconPosition="left"
              fullWidth
            >
              Send Personalized Email
            </Button>
            <Button
              variant="outline"
              iconName="Calendar"
              iconPosition="left"
              fullWidth
            >
              Schedule Meeting
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailsModal;