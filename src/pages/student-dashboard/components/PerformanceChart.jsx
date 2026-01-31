import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import Button from '../../../components/ui/Button';

const PerformanceChart = ({ data = [], subjects = [] }) => {
  const [chartType, setChartType] = useState('line');
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filteredData = selectedSubject === 'all' 
    ? data 
    : data?.map(item => ({
        month: item?.month,
        [selectedSubject]: item?.[selectedSubject]
      }));

  const subjectColors = {
    mathematics: '#3B82F6',
    physics: '#10B981',
    chemistry: '#F59E0B',
    biology: '#EF4444',
    english: '#8B5CF6'
  };

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 shadow-sm border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground">
          Performance Trends
        </h3>
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant={chartType === 'line' ? 'default' : 'outline'}
            size="sm"
            iconName="TrendingUp"
            onClick={() => setChartType('line')}
          >
            Line
          </Button>
          <Button
            variant={chartType === 'bar' ? 'default' : 'outline'}
            size="sm"
            iconName="BarChart3"
            onClick={() => setChartType('bar')}
          >
            Bar
          </Button>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setSelectedSubject('all')}
            className={`px-3 py-1.5 rounded-md caption transition-smooth ${
              selectedSubject === 'all' ?'bg-primary text-primary-foreground' :'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            All Subjects
          </button>
          {subjects?.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-3 py-1.5 rounded-md caption transition-smooth capitalize ${
                selectedSubject === subject 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>
      <div className="w-full h-64 md:h-80" aria-label="Academic Performance Chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'line' ? (
            <LineChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              {selectedSubject === 'all' ? (
                subjects?.map((subject) => (
                  <Line 
                    key={subject}
                    type="monotone" 
                    dataKey={subject} 
                    stroke={subjectColors?.[subject]}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                ))
              ) : (
                <Line 
                  type="monotone" 
                  dataKey={selectedSubject} 
                  stroke={subjectColors?.[selectedSubject]}
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          ) : (
            <BarChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="month" 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                style={{ fontSize: '12px' }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              {selectedSubject === 'all' ? (
                subjects?.map((subject) => (
                  <Bar 
                    key={subject}
                    dataKey={subject} 
                    fill={subjectColors?.[subject]}
                    radius={[4, 4, 0, 0]}
                  />
                ))
              ) : (
                <Bar 
                  dataKey={selectedSubject} 
                  fill={subjectColors?.[selectedSubject]}
                  radius={[4, 4, 0, 0]}
                />
              )}
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;