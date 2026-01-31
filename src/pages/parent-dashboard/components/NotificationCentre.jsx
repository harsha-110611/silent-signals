import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const NotificationCenter = ({ notifications }) => {
  const [filter, setFilter] = useState('all');

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return { name: 'AlertTriangle', color: 'var(--color-destructive)' };
      case 'summary':
        return { name: 'FileText', color: 'var(--color-primary)' };
      case 'progress':
        return { name: 'TrendingUp', color: 'var(--color-success)' };
      case 'intervention':
        return { name: 'MessageSquare', color: 'var(--color-warning)' };
      default:
        return { name: 'Bell', color: 'var(--color-muted-foreground)' };
    }
  };

  const getNotificationBg = (type) => {
    switch (type) {
      case 'alert':
        return 'bg-destructive/5 border-destructive/20';
      case 'summary':
        return 'bg-primary/5 border-primary/20';
      case 'progress':
        return 'bg-success/5 border-success/20';
      case 'intervention':
        return 'bg-warning/5 border-warning/20';
      default:
        return 'bg-muted/30 border-border';
    }
  };

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications?.filter(n => n?.type === filter);

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 md:mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Bell" size={24} color="var(--color-accent)" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              Notification Center
            </h3>
            <p className="caption text-muted-foreground">
              Recent automated alerts and updates
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {['all', 'alert', 'summary', 'progress', 'intervention']?.map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3 md:px-4 py-2 rounded-lg caption font-medium transition-smooth focus-ring whitespace-nowrap flex-shrink-0 ${
                filter === type
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {type?.charAt(0)?.toUpperCase() + type?.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8 md:py-12">
            <Icon name="Inbox" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No notifications found</p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => {
            const iconConfig = getNotificationIcon(notification?.type);
            return (
              <div
                key={notification?.id}
                className={`${getNotificationBg(notification?.type)} rounded-lg border p-4 md:p-5 transition-smooth hover:shadow-md`}
              >
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <Icon name={iconConfig?.name} size={20} color={iconConfig?.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h4 className="font-semibold text-foreground text-base md:text-lg">
                        {notification?.title}
                      </h4>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {notification?.read ? (
                          <span className="px-2 py-1 bg-muted rounded caption text-muted-foreground">
                            Read
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-primary/10 text-primary rounded caption font-medium">
                            New
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="caption text-muted-foreground mb-3 line-clamp-3">
                      {notification?.message}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                      <div className="flex items-center gap-2">
                        <Icon name="Clock" size={14} className="text-muted-foreground" />
                        <span className="caption text-muted-foreground">
                          {notification?.timestamp}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Icon name="Mail" size={14} className="text-muted-foreground" />
                        <span className="caption text-muted-foreground">
                          Sent via {notification?.channel}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default NotificationCenter;