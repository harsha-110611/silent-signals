import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const AnalyticsChart = ({ data, type = 'bar', title, description }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="caption font-semibold text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry?.color }}
              />
              <span className="text-sm text-muted-foreground">{entry?.name}:</span>
              <span className="text-sm font-semibold text-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 md:p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-1">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <button className="p-2 hover:bg-muted rounded-lg transition-smooth">
          <Icon name="MoreVertical" size={20} className="text-muted-foreground" />
        </button>
      </div>
      <div className="w-full h-64 md:h-80" aria-label={`${title} Chart`}>
        <ResponsiveContainer width="100%" height="100%">
          {type === 'bar' ? (
            <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                stroke="var(--color-border)"
              />
              <YAxis 
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                stroke="var(--color-border)"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', color: 'var(--color-foreground)' }}
              />
              <Bar dataKey="value" fill="var(--color-primary)" radius={[8, 8, 0, 0]} />
              {data?.[0]?.comparison !== undefined && (
                <Bar dataKey="comparison" fill="var(--color-secondary)" radius={[8, 8, 0, 0]} />
              )}
            </BarChart>
          ) : (
            <LineChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                stroke="var(--color-border)"
              />
              <YAxis 
                tick={{ fill: 'var(--color-muted-foreground)', fontSize: 12 }}
                stroke="var(--color-border)"
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ fontSize: '12px', color: 'var(--color-foreground)' }}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="var(--color-primary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-primary)', r: 4 }}
              />
              {data?.[0]?.comparison !== undefined && (
                <Line 
                  type="monotone" 
                  dataKey="comparison" 
                  stroke="var(--color-secondary)" 
                  strokeWidth={2}
                  dot={{ fill: 'var(--color-secondary)', r: 4 }}
                />
              )}
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsChart;