import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import ResourceCard from './ResourceCard';

const SubjectSection = ({ subject, resources, bookmarkedIds, onBookmark }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'text-destructive',
      medium: 'text-warning',
      low: 'text-success'
    };
    return colors?.[priority] || 'text-muted-foreground';
  };

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 md:p-6 flex items-center justify-between hover:bg-muted/50 transition-smooth focus-ring"
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="BookOpen" size={20} color="var(--color-primary)" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <h2 className="font-heading font-semibold text-lg md:text-xl text-foreground mb-1">
              {subject?.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <span className="caption text-muted-foreground">
                {resources?.length} {resources?.length === 1 ? 'resource' : 'resources'}
              </span>
              {subject?.priority && (
                <span className={`caption flex items-center gap-1 ${getPriorityColor(subject?.priority)}`}>
                  <Icon name="AlertCircle" size={14} />
                  {subject?.priority} priority
                </span>
              )}
              {subject?.missedTopics > 0 && (
                <span className="caption text-destructive flex items-center gap-1">
                  <Icon name="AlertTriangle" size={14} />
                  {subject?.missedTopics} missed topics
                </span>
              )}
            </div>
          </div>
        </div>
        <Icon 
          name={isExpanded ? 'ChevronUp' : 'ChevronDown'} 
          size={24}
          className="flex-shrink-0 ml-2"
        />
      </button>
      {isExpanded && (
        <div className="p-4 md:p-6 pt-0 space-y-4">
          {resources?.map((resource) => (
            <ResourceCard
              key={resource?.id}
              resource={resource}
              onBookmark={onBookmark}
              isBookmarked={bookmarkedIds?.includes(resource?.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectSection;