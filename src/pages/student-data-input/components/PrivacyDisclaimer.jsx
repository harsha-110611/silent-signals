import React from 'react';

const PrivacyDisclaimer = () => {
  return (
    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 md:p-6">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <div className="flex-1 space-y-3 md:space-y-4">
          <h4 className="text-base md:text-lg font-heading font-semibold text-foreground">
            Privacy &amp; Data Usage
          </h4>
          <div className="space-y-2 text-sm md:text-base text-muted-foreground">
            <p>
              Your academic data is securely stored and used exclusively for AI-powered analysis to support your learning journey. We are committed to protecting your privacy and maintaining educational compliance standards.
            </p>
            <ul className="space-y-1.5 ml-4 list-disc">
              <li>Data is encrypted and stored in secure Firebase Firestore databases</li>
              <li>AI analysis uses Google Gemini API to identify learning patterns and provide personalized recommendations</li>
              <li>Automated notifications are sent to you, your parents, and assigned mentors to support your academic success</li>
              <li>Your data is never shared with third parties or used for commercial purposes</li>
              <li>You can request data deletion at any time through your account settings</li>
            </ul>
            <p className="mt-3 md:mt-4">
              By submitting this form, you consent to the processing of your academic data as described above and acknowledge that you have read our complete privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyDisclaimer;