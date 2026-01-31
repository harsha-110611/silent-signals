import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissedTopicsSection = ({ topics, onTopicClick }) => {
  if (!topics || topics?.length === 0) {
    return null;
  }

  return (
    <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="AlertTriangle" size={20} color="var(--color-destructive)" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-heading font-semibold text-lg md:text-xl text-foreground mb-1">
            Missed Topics Requiring Attention
          </h2>
          <p className="caption text-muted-foreground">
            These topics were identified as gaps in your learning. Focus on these areas to improve your understanding.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {topics?.map((topic) => (
          <div 
            key={topic?.id}
            className="bg-card rounded-lg border border-border p-4 hover:shadow-md transition-smooth"
          >
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-base text-foreground mb-1 line-clamp-1">
                  {topic?.name}
                </h3>
                <p className="caption text-muted-foreground mb-2">
                  {topic?.subject}
                </p>
              </div>
              <span className="caption px-2 py-1 bg-destructive/10 text-destructive rounded-md whitespace-nowrap flex-shrink-0">
                {topic?.priority} priority
              </span>
            </div>

            <p className="caption text-muted-foreground mb-3 line-clamp-2">
              {topic?.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="caption text-muted-foreground flex items-center gap-1">
                <Icon name="BookOpen" size={14} />
                {topic?.resourceCount} resources
              </span>
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
                onClick={() => onTopicClick(topic)}
              >
                Learn Now
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MissedTopicsSection;