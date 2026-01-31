import React from 'react';
import Icon from '../../../components/AppIcon';

const AttendanceTracker = ({ attendanceData = [], irregularities = [] }) => {
  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Attendance Tracking
        </h3>
        <Icon name="Calendar" size={20} className="text-primary" />
      </div>
      <div className="space-y-3 mb-4">
        {attendanceData?.map((record, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                record?.status === 'present' ? 'bg-success/20 text-success' : 
                record?.status === 'absent'? 'bg-destructive/20 text-destructive' : 'bg-warning/20 text-warning'
              }`}>
                <Icon 
                  name={record?.status === 'present' ? 'Check' : record?.status === 'absent' ? 'X' : 'Clock'} 
                  size={16} 
                />
              </div>
              <div>
                <p className="caption font-medium text-foreground">{record?.subject}</p>
                <p className="text-xs text-muted-foreground">{record?.date}</p>
              </div>
            </div>
            <span className={`text-xs font-medium capitalize ${
              record?.status === 'present' ? 'text-success' : 
              record?.status === 'absent'? 'text-destructive' : 'text-warning'
            }`}>
              {record?.status}
            </span>
          </div>
        ))}
      </div>
      {irregularities && irregularities?.length > 0 && (
        <div className="pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Icon name="AlertCircle" size={16} className="text-warning" />
            <h4 className="caption font-medium text-foreground">AI-Detected Patterns:</h4>
          </div>
          <div className="space-y-2">
            {irregularities?.map((item, index) => (
              <div key={index} className="flex items-start gap-2 p-2 bg-warning/5 rounded">
                <Icon name="Sparkles" size={14} className="text-warning mt-0.5 flex-shrink-0" />
                <p className="text-xs text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceTracker;