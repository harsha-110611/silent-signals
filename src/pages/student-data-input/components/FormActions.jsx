import React from 'react';
import Button from '../../../components/ui/Button';

const FormActions = ({ onSaveDraft, onSubmit, isSubmitting, isDraftSaving }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
      <Button
        variant="outline"
        iconName="Save"
        iconPosition="left"
        onClick={onSaveDraft}
        loading={isDraftSaving}
        disabled={isSubmitting}
        fullWidth
        className="sm:flex-1"
      >
        Save Draft
      </Button>
      <Button
        variant="default"
        iconName="Send"
        iconPosition="left"
        onClick={onSubmit}
        loading={isSubmitting}
        disabled={isDraftSaving}
        fullWidth
        className="sm:flex-1"
      >
        Submit for Analysis
      </Button>
    </div>
  );
};

export default FormActions;