import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const LoginForm = ({ onSubmit, loading = false }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const roleOptions = [
    { value: 'student', label: 'Student', description: 'Access your academic dashboard and learning resources' },
    { value: 'parent', label: 'Parent', description: 'Monitor your child\'s academic progress' },
    { value: 'mentor', label: 'Mentor', description: 'View and support multiple students' }
  ];

  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email address is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(value)) return 'Please enter a valid email address';
        return '';
      case 'password':
        if (!value) return 'Password is required';
        if (value?.length < 6) return 'Password must be at least 6 characters';
        return '';
      case 'role':
        if (!value) return 'Please select your role to continue';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched?.[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, formData?.[name]) }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    const newErrors = {};
    Object.keys(formData)?.forEach(key => {
      if (key !== 'rememberMe') {
        const error = validateField(key, formData?.[key]);
        if (error) newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    setTouched({ email: true, password: true, role: true });

    if (Object.keys(newErrors)?.length === 0) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
      <Select
        label="I am a"
        placeholder="Select your role"
        description="Choose your account type to access the appropriate dashboard"
        options={roleOptions}
        value={formData?.role}
        onChange={(value) => handleChange('role', value)}
        error={touched?.role ? errors?.role : ''}
        required
      />
      <Input
        type="email"
        label="Email Address"
        placeholder="student@university.edu"
        value={formData?.email}
        onChange={(e) => handleChange('email', e?.target?.value)}
        onBlur={() => handleBlur('email')}
        error={touched?.email ? errors?.email : ''}
        required
        autoComplete="email"
      />
      <Input
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={formData?.password}
        onChange={(e) => handleChange('password', e?.target?.value)}
        onBlur={() => handleBlur('password')}
        error={touched?.password ? errors?.password : ''}
        required
        autoComplete="current-password"
      />
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Checkbox
          label="Remember me"
          checked={formData?.rememberMe}
          onChange={(e) => handleChange('rememberMe', e?.target?.checked)}
          size="sm"
        />
        <button
          type="button"
          className="caption text-primary hover:text-primary/80 transition-smooth focus-ring rounded px-1"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        disabled={loading}
        className="h-11 md:h-12"
      >
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;