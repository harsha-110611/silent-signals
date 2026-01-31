import React from 'react';
import Button from '../../../components/ui/Button';
import SubjectCard from './SubjectCard';

const ExamSection = ({ subjects, onSubjectsChange }) => {
  const addSubject = () => {
    onSubjectsChange([
      ...subjects,
      {
        id: Date.now(),
        name: '',
        exams: [{ examName: '', marks: '', maxMarks: '', date: '' }]
      }
    ]);
  };

  const updateSubject = (index, updatedSubject) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = updatedSubject;
    onSubjectsChange(updatedSubjects);
  };

  const removeSubject = (index) => {
    onSubjectsChange(subjects?.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="bg-muted/50 rounded-lg p-4 md:p-5">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <p className="caption font-medium text-foreground mb-1">Subject-wise performance</p>
            <p className="text-sm text-muted-foreground">
              Add all subjects and their exam scores. Include mid-terms, finals, quizzes, and assignments. Multiple exams per subject help provide better analysis.
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-4 md:space-y-5">
        {subjects?.map((subject, index) => (
          <SubjectCard
            key={subject?.id}
            subject={subject}
            onUpdate={(updated) => updateSubject(index, updated)}
            onRemove={() => removeSubject(index)}
            showRemove={subjects?.length > 1}
          />
        ))}
      </div>
      <Button
        variant="secondary"
        iconName="Plus"
        iconPosition="left"
        onClick={addSubject}
        fullWidth
      >
        Add Another Subject
      </Button>
    </div>
  );
};

export default ExamSection;