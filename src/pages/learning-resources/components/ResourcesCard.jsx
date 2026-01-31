import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onBookmark, isBookmarked }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getDifficultyColor = (level) => {
    const colors = {
      beginner: 'bg-success/10 text-success',
      intermediate: 'bg-warning/10 text-warning',
      advanced: 'bg-destructive/10 text-destructive'
    };
    return colors?.[level] || colors?.beginner;
  };

  const getTypeIcon = (type) => {
    const icons = {
      video: 'Video',
      article: 'FileText',
      exercise: 'PenTool',
      quiz: 'HelpCircle',
      tutorial: 'BookOpen'
    };
    return icons?.[type] || 'BookOpen';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 hover:shadow-md transition-smooth">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name={getTypeIcon(resource?.type)} size={20} color="var(--color-primary)" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-semibold text-base md:text-lg text-foreground mb-1 line-clamp-2">
              {resource?.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`caption px-2 py-1 rounded-md ${getDifficultyColor(resource?.difficulty)}`}>
                {resource?.difficulty}
              </span>
              <span className="caption text-muted-foreground flex items-center gap-1">
                <Icon name="Clock" size={14} />
                {resource?.duration}
              </span>
              {resource?.relevanceScore && (
                <span className="caption text-muted-foreground flex items-center gap-1">
                  <Icon name="TrendingUp" size={14} />
                  {resource?.relevanceScore}% match
                </span>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={() => onBookmark(resource?.id)}
          className="p-2 hover:bg-muted rounded-md transition-smooth focus-ring flex-shrink-0"
          aria-label={isBookmarked ? 'Remove bookmark' : 'Add bookmark'}
        >
          <Icon 
            name={isBookmarked ? 'Bookmark' : 'Bookmark'} 
            size={20} 
            color={isBookmarked ? 'var(--color-primary)' : 'currentColor'}
            fill={isBookmarked ? 'var(--color-primary)' : 'none'}
          />
        </button>
      </div>
      <p className={`caption text-muted-foreground mb-4 ${isExpanded ? '' : 'line-clamp-2'}`}>
        {resource?.description}
      </p>
      {resource?.topics && resource?.topics?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {resource?.topics?.slice(0, isExpanded ? resource?.topics?.length : 3)?.map((topic, index) => (
            <span 
              key={index}
              className="caption px-2 py-1 bg-muted text-muted-foreground rounded-md"
            >
              {topic}
            </span>
          ))}
          {!isExpanded && resource?.topics?.length > 3 && (
            <span className="caption text-primary">+{resource?.topics?.length - 3} more</span>
          )}
        </div>
      )}
      {resource?.progress !== undefined && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="caption text-muted-foreground">Progress</span>
            <span className="caption font-medium text-foreground">{resource?.progress}%</span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-smooth"
              style={{ width: `${resource?.progress}%` }}
            />
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          variant="default"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          fullWidth
          onClick={() => window.open(resource?.link, '_blank')}
        >
          {resource?.progress > 0 ? 'Continue Learning' : 'Start Learning'}
        </Button>
        {resource?.topics && resource?.topics?.length > 3 && (
          <Button
            variant="outline"
            size="sm"
            iconName={isExpanded ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
            className="sm:w-auto"
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResourceCard;