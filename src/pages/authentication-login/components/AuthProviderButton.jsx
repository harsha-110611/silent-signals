import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AuthProviderButton = ({ 
  provider, 
  onClick, 
  disabled = false,
  loading = false 
}) => {
  const providerConfig = {
    google: {
      icon: 'Google',
      label: 'Continue with Google',
      bgColor: 'bg-white hover:bg-gray-50',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    github: {
      icon: 'Github',
      label: 'Continue with GitHub',
      bgColor: 'bg-gray-900 hover:bg-gray-800',
      textColor: 'text-white',
      borderColor: 'border-gray-900'
    },
    email: {
      icon: 'Mail',
      label: 'Continue with Email',
      bgColor: 'bg-primary hover:bg-primary/90',
      textColor: 'text-primary-foreground',
      borderColor: 'border-primary'
    }
  };

  const config = providerConfig?.[provider];

  return (
    <Button
      variant="outline"
      fullWidth
      disabled={disabled || loading}
      loading={loading}
      onClick={onClick}
      className={`
        ${config?.bgColor} ${config?.textColor} border ${config?.borderColor}
        transition-smooth h-11 md:h-12
      `}
    >
      <div className="flex items-center justify-center gap-3 w-full">
        <Icon name={config?.icon} size={20} />
        <span className="caption font-medium">{config?.label}</span>
      </div>
    </Button>
  );
};

export default AuthProviderButton;