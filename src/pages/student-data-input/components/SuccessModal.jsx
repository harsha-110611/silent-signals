import React from 'react';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, onViewDashboard }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div className="relative bg-card rounded-lg shadow-xl border border-border max-w-md w-full p-6 md:p-8 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-success/20 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
              Data Submitted Successfully!
            </h3>
            <p className="text-sm md:text-base text-muted-foreground">
              Your academic data has been received and is being analyzed by our AI system. You'll receive personalized insights and recommendations shortly.
            </p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <p className="caption font-medium text-foreground">What happens next?</p>
          <ul className="space-y-1.5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>AI analysis will identify patterns and weak areas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Personalized learning resources will be recommended</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>Notifications will be sent to your parents and mentor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>View detailed insights on your dashboard</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            fullWidth
            className="sm:flex-1"
          >
            Close
          </Button>
          <Button
            variant="default"
            iconName="LayoutDashboard"
            iconPosition="left"
            onClick={onViewDashboard}
            fullWidth
            className="sm:flex-1"
          >
            View Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;