import React from 'react';
import Input from '../../../components/ui/Input';

const LMSSection = ({ lmsFrequency, onLmsChange, error }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <Input
        type="number"
        label="LMS Login Frequency (per week)"
        description="How many times do you log into the Learning Management System weekly?"
        placeholder="e.g., 12"
        value={lmsFrequency}
        onChange={(e) => onLmsChange(e?.target?.value)}
        error={error}
        min="0"
        required
      />
      <div className="bg-muted/50 rounded-lg p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4M12 8h.01" />
            </svg>
          </div>
          <div>
            <p className="caption font-medium text-foreground mb-1">Why this matters</p>
            <p className="text-sm text-muted-foreground">
              Regular LMS engagement indicates active learning participation. Include logins for viewing materials, submitting assignments, and checking announcements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LMSSection;