import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InterventionPanel = ({ interventions, onSendEmail, onScheduleMeeting }) => {
  const [activeTab, setActiveTab] = useState('pending');

  const tabs = [
    { id: 'pending', label: 'Pending Alerts', count: interventions?.pending?.length },
    { id: 'recent', label: 'Recent Notifications', count: interventions?.recent?.length },
    { id: 'followup', label: 'Follow-ups', count: interventions?.followup?.length },
  ];

  const getStatusBadge = (status) => {
    const styles = {
      urgent: 'bg-destructive/10 text-destructive border-destructive/20',
      scheduled: 'bg-warning/10 text-warning border-warning/20',
      completed: 'bg-success/10 text-success border-success/20',
      sent: 'bg-primary/10 text-primary border-primary/20',
    };
    return styles?.[status] || styles?.sent;
  };

  const renderContent = () => {
    const data = interventions?.[activeTab] || [];

    if (data?.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Icon name="CheckCircle" size={32} className="text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No {activeTab} interventions</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {data?.map((item) => (
          <div key={item?.id} className="p-4 bg-muted/30 rounded-lg border border-border hover:border-primary/30 transition-smooth">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="caption font-semibold text-foreground data-text">
                    {item?.studentId}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-xs font-medium ${getStatusBadge(item?.status)}`}>
                    {item?.status?.charAt(0)?.toUpperCase() + item?.status?.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-foreground mb-2">{item?.message}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    {item?.timestamp}
                  </span>
                  {item?.type && (
                    <span className="flex items-center gap-1">
                      <Icon name="Tag" size={14} />
                      {item?.type}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {activeTab === 'pending' && (
              <div className="flex gap-2 pt-3 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Mail"
                  iconPosition="left"
                  onClick={() => onSendEmail(item?.studentId)}
                >
                  Send Email
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Calendar"
                  iconPosition="left"
                  onClick={() => onScheduleMeeting(item?.studentId)}
                >
                  Schedule
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Intervention Management
          </h3>
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-smooth
                caption font-medium flex-shrink-0
                ${activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }
              `}
            >
              {tab?.label}
              <span className={`
                px-2 py-0.5 rounded-full text-xs font-semibold
                ${activeTab === tab?.id
                  ? 'bg-primary-foreground/20 text-primary-foreground'
                  : 'bg-background text-foreground'
                }
              `}>
                {tab?.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      <div className="p-4 md:p-6 max-h-96 overflow-y-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default InterventionPanel;