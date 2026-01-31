import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SubjectCard = ({ subject, onUpdate, onRemove, showRemove }) => {
  const handleExamChange = (index, field, value) => {
    const updatedExams = [...subject?.exams];
    updatedExams[index] = { ...updatedExams?.[index], [field]: value };
    onUpdate({ ...subject, exams: updatedExams });
  };

  const addExam = () => {
    onUpdate({
      ...subject,
      exams: [...subject?.exams, { examName: '', marks: '', maxMarks: '', date: '' }]
    });
  };

  const removeExam = (index) => {
    const updatedExams = subject?.exams?.filter((_, i) => i !== index);
    onUpdate({ ...subject, exams: updatedExams });
  };

  return (
    <div className="bg-muted/30 rounded-lg p-4 md:p-5 space-y-4 md:space-y-5">
      <div className="flex items-start justify-between gap-3">
        <Input
          type="text"
          label="Subject Name"
          placeholder="e.g., Data Structures"
          value={subject?.name}
          onChange={(e) => onUpdate({ ...subject, name: e?.target?.value })}
          required
          className="flex-1"
        />
        {showRemove && (
          <Button
            variant="ghost"
            size="icon"
            iconName="Trash2"
            onClick={onRemove}
            className="mt-8"
          />
        )}
      </div>
      <div className="space-y-4">
        <p className="caption font-medium text-foreground">Exam Scores</p>
        
        {subject?.exams?.map((exam, index) => (
          <div key={index} className="bg-card rounded-lg p-3 md:p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-muted-foreground">
                Exam {index + 1}
              </span>
              {subject?.exams?.length > 1 && (
                <button
                  onClick={() => removeExam(index)}
                  className="text-destructive hover:text-destructive/80 transition-smooth p-1"
                  aria-label="Remove exam"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
              <Input
                type="text"
                label="Exam Name"
                placeholder="e.g., Mid-term"
                value={exam?.examName}
                onChange={(e) => handleExamChange(index, 'examName', e?.target?.value)}
                required
              />
              <Input
                type="date"
                label="Exam Date"
                value={exam?.date}
                onChange={(e) => handleExamChange(index, 'date', e?.target?.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Input
                type="number"
                label="Marks Obtained"
                placeholder="e.g., 42"
                value={exam?.marks}
                onChange={(e) => handleExamChange(index, 'marks', e?.target?.value)}
                min="0"
                required
              />
              <Input
                type="number"
                label="Maximum Marks"
                placeholder="e.g., 50"
                value={exam?.maxMarks}
                onChange={(e) => handleExamChange(index, 'maxMarks', e?.target?.value)}
                min="0"
                required
              />
            </div>

            {exam?.marks && exam?.maxMarks && (
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Percentage:</span>
                <span className="font-medium text-foreground data-text">
                  {((parseFloat(exam?.marks) / parseFloat(exam?.maxMarks)) * 100)?.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        ))}

        <Button
          variant="outline"
          iconName="Plus"
          iconPosition="left"
          onClick={addExam}
          fullWidth
        >
          Add Another Exam
        </Button>
      </div>
    </div>
  );
};

export default SubjectCard;