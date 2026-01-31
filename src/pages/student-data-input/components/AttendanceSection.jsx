import React from 'react';
import Input from '../../../components/ui/Input';

const AttendanceSection = ({ attendance, onAttendanceChange, error }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <Input
        type="number"
        label="Overall Attendance Percentage"
        description="Enter your current semester attendance percentage (0-100)"
        placeholder="e.g., 85"
        value={attendance}
        onChange={(e) => onAttendanceChange(e?.target?.value)}
        error={error}
        min="0"
        max="100"
        required
      />
      <div className="bg-muted/50 rounded-lg p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <div>
            <p className="caption font-medium text-foreground mb-1">How to calculate</p>
            <p className="text-sm text-muted-foreground">
              Divide total classes attended by total classes conducted, then multiply by 100. Example: (68 attended ÷ 80 total) × 100 = 85%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSection;