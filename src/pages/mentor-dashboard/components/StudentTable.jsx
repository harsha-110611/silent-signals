import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const StudentTable = ({ 
  students, 
  onSort, 
  sortConfig, 
  onViewDetails,
  selectedStudents,
  onSelectStudent,
  onSelectAll 
}) => {
  const [expandedRows, setExpandedRows] = useState([]);

  const getRiskBadgeStyles = (risk) => {
    const styles = {
      critical: 'bg-destructive/10 text-destructive border-destructive/20',
      warning: 'bg-warning/10 text-warning border-warning/20',
      normal: 'bg-success/10 text-success border-success/20',
    };
    return styles?.[risk] || styles?.normal;
  };

  const getEngagementColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const handleSort = (field) => {
    onSort(field);
  };

  const toggleRowExpansion = (studentId) => {
    setExpandedRows(prev => 
      prev?.includes(studentId) 
        ? prev?.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const SortIcon = ({ field }) => {
    if (sortConfig?.field !== field) {
      return <Icon name="ChevronsUpDown" size={16} className="text-muted-foreground" />;
    }
    return (
      <Icon 
        name={sortConfig?.direction === 'asc' ? 'ChevronUp' : 'ChevronDown'} 
        size={16} 
        className="text-primary" 
      />
    );
  };

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden lg:block bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left">
                  <Checkbox
                    checked={selectedStudents?.length === students?.length && students?.length > 0}
                    onChange={(e) => onSelectAll(e?.target?.checked)}
                    indeterminate={selectedStudents?.length > 0 && selectedStudents?.length < students?.length}
                  />
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('studentId')}
                    className="flex items-center gap-2 caption font-semibold text-foreground hover:text-primary transition-smooth"
                  >
                    Student ID
                    <SortIcon field="studentId" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('engagementScore')}
                    className="flex items-center gap-2 caption font-semibold text-foreground hover:text-primary transition-smooth"
                  >
                    Engagement Score
                    <SortIcon field="engagementScore" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    onClick={() => handleSort('riskLevel')}
                    className="flex items-center gap-2 caption font-semibold text-foreground hover:text-primary transition-smooth"
                  >
                    Risk Level
                    <SortIcon field="riskLevel" />
                  </button>
                </th>
                <th className="px-4 py-3 text-left caption font-semibold text-foreground">
                  Weak Subjects
                </th>
                <th className="px-4 py-3 text-left caption font-semibold text-foreground">
                  Last Updated
                </th>
                <th className="px-4 py-3 text-center caption font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {students?.map((student) => (
                <tr key={student?.id} className="hover:bg-muted/30 transition-smooth">
                  <td className="px-4 py-4">
                    <Checkbox
                      checked={selectedStudents?.includes(student?.id)}
                      onChange={(e) => onSelectStudent(student?.id, e?.target?.checked)}
                    />
                  </td>
                  <td className="px-4 py-4">
                    <span className="caption font-medium text-foreground data-text">
                      {student?.studentId}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`caption font-semibold ${getEngagementColor(student?.engagementScore)}`}>
                        {student?.engagementScore}%
                      </span>
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${student?.engagementScore >= 80 ? 'bg-success' : student?.engagementScore >= 60 ? 'bg-warning' : 'bg-destructive'}`}
                          style={{ width: `${student?.engagementScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border caption font-medium ${getRiskBadgeStyles(student?.riskLevel)}`}>
                      <Icon 
                        name={student?.riskLevel === 'critical' ? 'AlertTriangle' : student?.riskLevel === 'warning' ? 'AlertCircle' : 'CheckCircle'} 
                        size={14} 
                      />
                      {student?.riskLevel?.charAt(0)?.toUpperCase() + student?.riskLevel?.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {student?.weakSubjects?.slice(0, 2)?.map((subject, idx) => (
                        <span key={idx} className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                          {subject}
                        </span>
                      ))}
                      {student?.weakSubjects?.length > 2 && (
                        <span className="px-2 py-1 bg-primary/10 text-primary rounded text-xs font-medium">
                          +{student?.weakSubjects?.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="text-sm text-muted-foreground">
                      {student?.lastUpdated}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Eye"
                        onClick={() => onViewDetails(student)}
                      >
                        View
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="Mail"
                      >
                        Email
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {students?.map((student) => (
          <div key={student?.id} className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Checkbox
                    checked={selectedStudents?.includes(student?.id)}
                    onChange={(e) => onSelectStudent(student?.id, e?.target?.checked)}
                  />
                  <div>
                    <p className="caption font-semibold text-foreground data-text">
                      {student?.studentId}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Updated: {student?.lastUpdated}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => toggleRowExpansion(student?.id)}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                >
                  <Icon 
                    name={expandedRows?.includes(student?.id) ? 'ChevronUp' : 'ChevronDown'} 
                    size={20} 
                  />
                </button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Engagement</span>
                  <div className="flex items-center gap-2">
                    <span className={`caption font-semibold ${getEngagementColor(student?.engagementScore)}`}>
                      {student?.engagementScore}%
                    </span>
                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${student?.engagementScore >= 80 ? 'bg-success' : student?.engagementScore >= 60 ? 'bg-warning' : 'bg-destructive'}`}
                        style={{ width: `${student?.engagementScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Risk Level</span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border caption font-medium ${getRiskBadgeStyles(student?.riskLevel)}`}>
                    <Icon 
                      name={student?.riskLevel === 'critical' ? 'AlertTriangle' : student?.riskLevel === 'warning' ? 'AlertCircle' : 'CheckCircle'} 
                      size={14} 
                    />
                    {student?.riskLevel?.charAt(0)?.toUpperCase() + student?.riskLevel?.slice(1)}
                  </span>
                </div>

                {expandedRows?.includes(student?.id) && (
                  <>
                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">Weak Subjects</p>
                      <div className="flex flex-wrap gap-2">
                        {student?.weakSubjects?.map((subject, idx) => (
                          <span key={idx} className="px-3 py-1 bg-muted rounded-lg text-sm text-foreground">
                            {subject}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-border">
                      <p className="text-sm text-muted-foreground mb-2">AI Insights</p>
                      <p className="text-sm text-foreground line-clamp-3">
                        {student?.aiInsights}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-3">
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Eye"
                        iconPosition="left"
                        fullWidth
                        onClick={() => onViewDetails(student)}
                      >
                        View Details
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        iconName="Mail"
                        iconPosition="left"
                        fullWidth
                      >
                        Send Email
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StudentTable;