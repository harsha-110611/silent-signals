import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CommunicationPanel = ({ communications }) => {
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    emailAlerts: true,
    weeklyReports: true,
    criticalOnly: false,
    mentorUpdates: true,
  });

  const handlePreferenceChange = (key) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="MessageSquare" size={24} color="var(--color-secondary)" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              Communication History
            </h3>
            <p className="caption text-muted-foreground">
              Previous alerts and progress updates
            </p>
          </div>
        </div>

        <Button
          variant="outline"
          iconName="Settings"
          iconPosition="left"
          onClick={() => setShowPreferences(!showPreferences)}
        >
          Preferences
        </Button>
      </div>
      {showPreferences && (
        <div className="mb-6 p-4 md:p-5 bg-muted/30 rounded-lg border border-border">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Icon name="Bell" size={18} />
            Notification Preferences
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
            {Object.entries(preferences)?.map(([key, value]) => (
              <label
                key={key}
                className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-card transition-smooth"
              >
                <input
                  type="checkbox"
                  checked={value}
                  onChange={() => handlePreferenceChange(key)}
                  className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
                />
                <span className="caption text-foreground">
                  {key?.replace(/([A-Z])/g, ' $1')?.replace(/^./, str => str?.toUpperCase())}
                </span>
              </label>
            ))}
          </div>
        </div>
      )}
      <div className="space-y-3 md:space-y-4">
        {communications?.map((comm) => (
          <div
            key={comm?.id}
            className="bg-muted/30 rounded-lg border border-border p-4 md:p-5 hover:shadow-md transition-smooth"
          >
            <div className="flex items-start gap-3 md:gap-4">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
                  comm?.sender === 'System' ? 'bg-primary/10' : 'bg-secondary/10'
                }`}>
                  <Icon
                    name={comm?.sender === 'System' ? 'Bot' : 'User'}
                    size={20}
                    color={comm?.sender === 'System' ? 'var(--color-primary)' : 'var(--color-secondary)'}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                  <div>
                    <h4 className="font-semibold text-foreground text-base md:text-lg">
                      {comm?.subject}
                    </h4>
                    <p className="caption text-muted-foreground">
                      From: {comm?.sender}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span className="caption text-muted-foreground whitespace-nowrap">
                      {comm?.timestamp}
                    </span>
                  </div>
                </div>

                <p className="caption text-muted-foreground mb-3 line-clamp-3">
                  {comm?.message}
                </p>

                <div className="flex flex-wrap items-center gap-2 md:gap-3">
                  <span className={`px-3 py-1 rounded-full caption ${
                    comm?.status === 'delivered' ?'bg-success/10 text-success border border-success/20'
                      : comm?.status === 'read' ?'bg-primary/10 text-primary border border-primary/20' :'bg-muted text-muted-foreground border border-border'
                  }`}>
                    {comm?.status?.charAt(0)?.toUpperCase() + comm?.status?.slice(1)}
                  </span>
                  {comm?.requiresAction && (
                    <Button
                      variant="outline"
                      size="sm"
                      iconName="ExternalLink"
                      iconPosition="right"
                    >
                      View Details
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Button
            variant="default"
            iconName="Send"
            iconPosition="left"
            className="flex-1 sm:flex-initial"
          >
            Contact Mentor
          </Button>
          <Button
            variant="outline"
            iconName="Calendar"
            iconPosition="left"
            className="flex-1 sm:flex-initial"
          >
            Schedule Meeting
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationPanel;