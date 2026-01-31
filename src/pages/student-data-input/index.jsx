import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import FormSection from './components/FormSection';
import AttendanceSection from './components/AttendanceSection';
import LMSSection from './components/LMSSection';
import ExamSection from './components/ExamSection';
import PrivacyDisclaimer from './components/PrivacyDisclaimer';
import FormActions from './components/FormActions';
import SuccessModal from './components/SuccessModal';

const StudentDataInput = () => {
  const navigate = useNavigate();
  
  const [expandedSections, setExpandedSections] = useState({
    attendance: true,
    lms: true,
    exams: true
  });

  const [formData, setFormData] = useState({
    attendance: '',
    lmsFrequency: '',
    subjects: [
      {
        id: Date.now(),
        name: '',
        exams: [{ examName: '', marks: '', maxMarks: '', date: '' }]
      }
    ]
  });

  const [errors, setErrors] = useState({
    attendance: '',
    lmsFrequency: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraftSaving, setIsDraftSaving] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard' },
    { label: 'Data Input', path: '/student-data-input' }
  ];

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const validateAttendance = (value) => {
    if (!value) {
      return 'Attendance percentage is required';
    }
    const num = parseFloat(value);
    if (isNaN(num) || num < 0 || num > 100) {
      return 'Please enter a valid percentage between 0 and 100';
    }
    return '';
  };

  const validateLMS = (value) => {
    if (!value) {
      return 'LMS login frequency is required';
    }
    const num = parseFloat(value);
    if (isNaN(num) || num < 0) {
      return 'Please enter a valid number';
    }
    return '';
  };

  const handleAttendanceChange = (value) => {
    setFormData(prev => ({ ...prev, attendance: value }));
    setErrors(prev => ({ ...prev, attendance: validateAttendance(value) }));
  };

  const handleLmsChange = (value) => {
    setFormData(prev => ({ ...prev, lmsFrequency: value }));
    setErrors(prev => ({ ...prev, lmsFrequency: validateLMS(value) }));
  };

  const handleSubjectsChange = (subjects) => {
    setFormData(prev => ({ ...prev, subjects }));
  };

  const validateForm = () => {
    const attendanceError = validateAttendance(formData?.attendance);
    const lmsError = validateLMS(formData?.lmsFrequency);

    setErrors({
      attendance: attendanceError,
      lmsFrequency: lmsError
    });

    if (attendanceError || lmsError) {
      return false;
    }

    for (const subject of formData?.subjects) {
      if (!subject?.name?.trim()) {
        alert('Please enter all subject names');
        return false;
      }
      for (const exam of subject?.exams) {
        if (!exam?.examName || !exam?.marks || !exam?.maxMarks || !exam?.date) {
          alert('Please complete all exam details for each subject');
          return false;
        }
      }
    }

    return true;
  };

  const handleSaveDraft = async () => {
    setIsDraftSaving(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log('Draft saved:', formData);
    
    setIsDraftSaving(false);
    
    const draftNotification = document.createElement('div');
    draftNotification.className = 'fixed top-20 right-4 bg-success text-success-foreground px-6 py-3 rounded-lg shadow-lg z-300 caption font-medium';
    draftNotification.textContent = 'Draft saved successfully';
    document.body?.appendChild(draftNotification);
    
    setTimeout(() => {
      draftNotification?.remove();
    }, 3000);
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Form submitted:', formData);
    
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleViewDashboard = () => {
    setShowSuccessModal(false);
    navigate('/student-dashboard');
  };

  return (
    <MainLayout userRole="student" userName="Alex Johnson">
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground mb-3 md:mb-4">
              Academic Data Input
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Submit your attendance, LMS activity, and exam scores for personalized AI-powered analysis and learning recommendations.
            </p>
          </div>

          <div className="space-y-4 md:space-y-6">
            <FormSection
              title="Attendance Information"
              description="Your overall attendance percentage for the current semester"
              isExpanded={expandedSections?.attendance}
              onToggle={() => toggleSection('attendance')}
            >
              <AttendanceSection
                attendance={formData?.attendance}
                onAttendanceChange={handleAttendanceChange}
                error={errors?.attendance}
              />
            </FormSection>

            <FormSection
              title="LMS Engagement"
              description="Track your Learning Management System activity"
              isExpanded={expandedSections?.lms}
              onToggle={() => toggleSection('lms')}
            >
              <LMSSection
                lmsFrequency={formData?.lmsFrequency}
                onLmsChange={handleLmsChange}
                error={errors?.lmsFrequency}
              />
            </FormSection>

            <FormSection
              title="Exam Performance"
              description="Add your subject-wise exam scores and grades"
              isExpanded={expandedSections?.exams}
              onToggle={() => toggleSection('exams')}
            >
              <ExamSection
                subjects={formData?.subjects}
                onSubjectsChange={handleSubjectsChange}
              />
            </FormSection>

            <PrivacyDisclaimer />

            <FormActions
              onSaveDraft={handleSaveDraft}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isDraftSaving={isDraftSaving}
            />
          </div>
        </div>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        onViewDashboard={handleViewDashboard}
      />
    </MainLayout>
  );
};

export default StudentDataInput;