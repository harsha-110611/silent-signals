import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceAnalysis = ({ subjects }) => {
  const [expandedSubject, setExpandedSubject] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 75) return 'text-success';
    if (score >= 50) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreBg = (score) => {
    if (score >= 75) return 'bg-success/10';
    if (score >= 50) return 'bg-warning/10';
    return 'bg-destructive/10';
  };

  return (
    <div className="bg-card rounded-lg border border-border p-4 md:p-6 lg:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-4 md:mb-6">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon name="BarChart3" size={24} color="var(--color-secondary)" />
        </div>
        <div>
          <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
            Subject Performance Analysis
          </h3>
          <p className="caption text-muted-foreground">
            Detailed breakdown of academic performance
          </p>
        </div>
      </div>
      <div className="space-y-3 md:space-y-4">
        {subjects?.map((subject) => (
          <div
            key={subject?.id}
            className="bg-muted/30 rounded-lg border border-border overflow-hidden transition-smooth"
          >
            <button
              onClick={() => setExpandedSubject(expandedSubject === subject?.id ? null : subject?.id)}
              className="w-full p-4 md:p-5 flex items-center justify-between hover:bg-muted/50 transition-smooth focus-ring"
            >
              <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                <div className={`${getScoreBg(subject?.score)} rounded-lg p-2 md:p-3 flex-shrink-0`}>
                  <Icon name="BookOpen" size={20} className={getScoreColor(subject?.score)} />
                </div>
                <div className="text-left flex-1 min-w-0">
                  <h4 className="font-semibold text-base md:text-lg text-foreground truncate">
                    {subject?.name}
                  </h4>
                  <p className="caption text-muted-foreground">
                    {subject?.credits} Credits • {subject?.semester}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className={`text-xl md:text-2xl font-bold data-text ${getScoreColor(subject?.score)}`}>
                    {subject?.score}%
                  </p>
                  <p className="caption text-muted-foreground whitespace-nowrap">
                    {subject?.grade}
                  </p>
                </div>
              </div>
              <Icon
                name="ChevronDown"
                size={20}
                className={`ml-3 text-muted-foreground transition-smooth flex-shrink-0 ${
                  expandedSubject === subject?.id ? 'rotate-180' : ''
                }`}
              />
            </button>

            {expandedSubject === subject?.id && (
              <div className="p-4 md:p-5 border-t border-border bg-card/50">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Icon name="AlertCircle" size={18} className="text-destructive" />
                      Weak Areas Identified
                    </h5>
                    <ul className="space-y-2">
                      {subject?.weakAreas?.map((area, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <Icon name="Minus" size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
                          <span className="caption text-foreground">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Icon name="Lightbulb" size={18} className="text-warning" />
                      AI Insights
                    </h5>
                    <p className="caption text-muted-foreground leading-relaxed">
                      {subject?.aiInsight}
                    </p>
                  </div>
                </div>

                <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-border">
                  <h5 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Icon name="Target" size={18} className="text-primary" />
                    Missed Topics
                  </h5>
                  <div className="flex flex-wrap gap-2">
                    {subject?.missedTopics?.map((topic, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-destructive/10 text-destructive rounded-full caption border border-destructive/20"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 md:mt-5 pt-4 md:pt-5 border-t border-border">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={16} className="text-muted-foreground" />
                      <span className="caption text-muted-foreground">
                        Attendance: {subject?.attendance}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="FileText" size={16} className="text-muted-foreground" />
                      <span className="caption text-muted-foreground">
                        Assignments: {subject?.assignmentsCompleted}/{subject?.totalAssignments}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceAnalysis;