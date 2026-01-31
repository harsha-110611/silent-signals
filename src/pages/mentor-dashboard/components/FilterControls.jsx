import React from 'react';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const FilterControls = ({ 
  filters, 
  onFilterChange, 
  onReset, 
  studentCount 
}) => {
  const riskLevelOptions = [
    { value: 'all', label: 'All Risk Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'warning', label: 'Warning' },
    { value: 'normal', label: 'Normal' },
  ];

  const subjectOptions = [
    { value: 'all', label: 'All Subjects' },
    { value: 'mathematics', label: 'Mathematics' },
    { value: 'physics', label: 'Physics' },
    { value: 'chemistry', label: 'Chemistry' },
    { value: 'computer-science', label: 'Computer Science' },
    { value: 'english', label: 'English' },
    { value: 'biology', label: 'Biology' },
  ];

  const performanceOptions = [
    { value: 'all', label: 'All Performance' },
    { value: 'excellent', label: 'Excellent (90-100%)' },
    { value: 'good', label: 'Good (75-89%)' },
    { value: 'average', label: 'Average (60-74%)' },
    { value: 'below-average', label: 'Below Average (&lt;60%)' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6 mb-4 md:mb-6">
      <div className="flex flex-col lg:flex-row lg:items-end gap-4">
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            label="Risk Level"
            options={riskLevelOptions}
            value={filters?.riskLevel}
            onChange={(value) => onFilterChange('riskLevel', value)}
            placeholder="Select risk level"
          />
          
          <Select
            label="Subject Area"
            options={subjectOptions}
            value={filters?.subject}
            onChange={(value) => onFilterChange('subject', value)}
            placeholder="Select subject"
            searchable
          />
          
          <Select
            label="Performance Range"
            options={performanceOptions}
            value={filters?.performance}
            onChange={(value) => onFilterChange('performance', value)}
            placeholder="Select performance"
          />
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={onReset}
          >
            Reset
          </Button>
          
          <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
            <Icon name="Users" size={18} color="var(--color-primary)" />
            <span className="caption font-medium text-primary">
              {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
            </span>
          </div>
        </div>
      </div>
      <div className="lg:hidden mt-4 flex items-center justify-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
        <Icon name="Users" size={18} color="var(--color-primary)" />
        <span className="caption font-medium text-primary">
          {studentCount} {studentCount === 1 ? 'Student' : 'Students'}
        </span>
      </div>
    </div>
  );
};

export default FilterControls;