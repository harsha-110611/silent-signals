import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MissedTopicsPanel = ({ topics = [] }) => {
  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="AlertCircle" size={20} className="text-warning" />
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
            Missed Topics
          </h3>
        </div>
        <span className="caption text-muted-foreground">
          {topics?.length} {topics?.length === 1 ? 'topic' : 'topics'}
        </span>
      </div>
      {topics?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="CheckCircle2" size={48} className="text-success mx-auto mb-3" />
          <p className="caption text-muted-foreground">
            Great job! You're up to date with all topics.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {topics?.map((topic, index) => (
            <div 
              key={index}
              className="p-3 md:p-4 bg-muted/50 rounded-lg border border-border hover:border-warning/30 transition-smooth"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <h4 className="caption font-medium text-foreground mb-1">
                    {topic?.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mb-2">
                    {topic?.subject} • Missed on {topic?.date}
                  </p>
                </div>
                <div className="bg-warning/10 text-warning px-2 py-1 rounded text-xs font-medium flex-shrink-0">
                  Priority
                </div>
              </div>
              
              {topic?.description && (
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  {topic?.description}
                </p>
              )}

              <div className="flex items-center gap-2 flex-wrap">
                <Button 
                  variant="outline" 
                  size="xs" 
                  iconName="BookOpen"
                  onClick={() => topic?.resourceLink && window.open(topic?.resourceLink, '_blank')}
                >
                  Study Material
                </Button>
                <Button 
                  variant="ghost" 
                  size="xs" 
                  iconName="Video"
                  onClick={() => topic?.videoLink && window.open(topic?.videoLink, '_blank')}
                >
                  Watch Video
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MissedTopicsPanel;