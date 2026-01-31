import React from 'react';
import Icon from '../../../components/AppIcon';

const PrivacyNotice = () => {
  return (
    <div className="mt-6 md:mt-8 p-4 bg-muted/50 rounded-lg border border-border">
      <div className="flex gap-3">
        <Icon 
          name="ShieldCheck" 
          size={20} 
          className="text-primary flex-shrink-0 mt-0.5"
        />
        <div className="space-y-1">
          <p className="caption font-medium text-foreground">
            Your Privacy Matters
          </p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            We use secure authentication to protect your academic data. Your information is encrypted and never shared without your consent. By signing in, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyNotice;