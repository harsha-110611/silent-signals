import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LearningResourceCard = ({ 
  title, 
  description, 
  type, 
  duration, 
  difficulty, 
  link,
  topics = [] 
}) => {
  const typeIcons = {
    video: 'Video',
    article: 'FileText',
    practice: 'Code',
    quiz: 'HelpCircle',
    tutorial: 'BookOpen'
  };

  const difficultyColors = {
    beginner: 'bg-success/10 text-success',
    intermediate: 'bg-warning/10 text-warning',
    advanced: 'bg-destructive/10 text-destructive'
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-5 shadow-sm border border-border transition-smooth hover:shadow-md">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name={typeIcons?.[type] || 'BookOpen'} size={20} className="text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-heading font-semibold text-foreground mb-1 text-base md:text-lg line-clamp-2">
            {title}
          </h4>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground capitalize">{type}</span>
            {duration && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{duration}</span>
              </>
            )}
            {difficulty && (
              <>
                <span className="text-xs text-muted-foreground">•</span>
                <span className={`text-xs px-2 py-0.5 rounded ${difficultyColors?.[difficulty]}`}>
                  {difficulty}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      <p className="caption text-muted-foreground mb-3 line-clamp-2">
        {description}
      </p>
      {topics && topics?.length > 0 && (
        <div className="mb-3">
          <p className="text-xs font-medium text-muted-foreground mb-2">Covers:</p>
          <div className="flex flex-wrap gap-1.5">
            {topics?.slice(0, 3)?.map((topic, index) => (
              <span 
                key={index}
                className="text-xs bg-muted text-foreground px-2 py-1 rounded"
              >
                {topic}
              </span>
            ))}
            {topics?.length > 3 && (
              <span className="text-xs text-muted-foreground px-2 py-1">
                +{topics?.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      <Button 
        variant="outline" 
        size="sm" 
        iconName="ExternalLink" 
        iconPosition="right"
        fullWidth
        onClick={() => link && window.open(link, '_blank')}
      >
        Access Resource
      </Button>
    </div>
  );
};

export default LearningResourceCard;