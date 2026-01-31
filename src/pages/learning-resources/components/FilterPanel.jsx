import React from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFilterChange, 
  onClearFilters,
  isMobileOpen,
  onMobileClose 
}) => {
  const resourceTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'video', label: 'Video Tutorials' },
    { value: 'article', label: 'Articles' },
    { value: 'exercise', label: 'Practice Exercises' },
    { value: 'quiz', label: 'Quizzes' },
    { value: 'tutorial', label: 'Interactive Tutorials' }
  ];

  const difficultyLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Under 15 min' },
    { value: 'medium', label: '15-30 min' },
    { value: 'long', label: 'Over 30 min' }
  ];

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant' },
    { value: 'recent', label: 'Recently Added' },
    { value: 'duration', label: 'Shortest First' },
    { value: 'difficulty', label: 'Easiest First' }
  ];

  const hasActiveFilters = 
    filters?.type !== 'all' || 
    filters?.difficulty !== 'all' || 
    filters?.duration !== 'all' ||
    filters?.showBookmarked ||
    filters?.showInProgress;

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold text-lg text-foreground">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="caption text-primary hover:text-primary/80 transition-smooth focus-ring rounded px-2 py-1"
          >
            Clear All
          </button>
        )}
      </div>

      <Select
        label="Resource Type"
        options={resourceTypes}
        value={filters?.type}
        onChange={(value) => onFilterChange('type', value)}
      />

      <Select
        label="Difficulty Level"
        options={difficultyLevels}
        value={filters?.difficulty}
        onChange={(value) => onFilterChange('difficulty', value)}
      />

      <Select
        label="Duration"
        options={durationOptions}
        value={filters?.duration}
        onChange={(value) => onFilterChange('duration', value)}
      />

      <Select
        label="Sort By"
        options={sortOptions}
        value={filters?.sortBy}
        onChange={(value) => onFilterChange('sortBy', value)}
      />

      <div className="space-y-3 pt-4 border-t border-border">
        <Checkbox
          label="Show Bookmarked Only"
          checked={filters?.showBookmarked}
          onChange={(e) => onFilterChange('showBookmarked', e?.target?.checked)}
        />
        <Checkbox
          label="Show In Progress"
          checked={filters?.showInProgress}
          onChange={(e) => onFilterChange('showInProgress', e?.target?.checked)}
        />
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Filter Panel */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <div className="sticky top-20 bg-card rounded-lg border border-border p-6">
          <FilterContent />
        </div>
      </div>

      {/* Mobile Filter Panel */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-200 lg:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onMobileClose}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-card shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between z-10">
              <h3 className="font-heading font-semibold text-lg text-foreground">Filters</h3>
              <button
                onClick={onMobileClose}
                className="p-2 hover:bg-muted rounded-md transition-smooth focus-ring"
                aria-label="Close filters"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
            <div className="p-4">
              <FilterContent />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPanel;