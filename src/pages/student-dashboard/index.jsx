import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import MetricCard from './components/MetricCard';
import RiskIndicator from './components/RiskIndicator';
import SubjectPerformanceCard from './components/SubjectPerformanceCard';
import LearningResourceCard from './components/LearningResourceCard';
import AttendanceTracker from './components/AttendanceTracker';
import PerformanceChart from './components/PerformanceChart';
import MissedTopicsPanel from './components/MissedTopicsPanel';
import QuickActions from './components/QuickActions';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [currentUser] = useState({
    name: 'Alex Johnson',
    role: 'student',
    studentId: 'STU2024001'
  });

  const breadcrumbItems = [
    { label: 'Home', path: '/student-dashboard' },
    { label: 'Dashboard' }
  ];

  const metricsData = [
    {
      title: 'Attendance Rate',
      value: '87.5%',
      subtitle: 'Last 30 days',
      icon: 'Calendar',
      trend: 'up',
      trendValue: '+2.3%',
      status: 'normal'
    },
    {
      title: 'LMS Login Frequency',
      value: '24',
      subtitle: 'Logins this month',
      icon: 'Activity',
      trend: 'up',
      trendValue: '+5',
      status: 'normal'
    },
    {
      title: 'Engagement Score',
      value: '8.2/10',
      subtitle: 'Overall performance',
      icon: 'TrendingUp',
      trend: 'neutral',
      trendValue: '0%',
      status: 'normal'
    },
    {
      title: 'Weak Subjects',
      value: '2',
      subtitle: 'Need attention',
      icon: 'AlertTriangle',
      status: 'warning'
    }
  ];

  const riskData = {
    level: 'warning',
    insights: [
      'Attendance has dropped below 90% threshold in the last two weeks, particularly in Physics and Chemistry classes.',
      'Performance in Mathematics shows declining trend with 15% decrease compared to previous assessment.',
      'LMS engagement is good, but practice quiz completion rate is only 60% for weak subjects.',
      'Recommended to focus on Calculus and Organic Chemistry topics where marks are consistently below 70%.'
    ]
  };

  const subjectsData = [
    {
      subject: 'Mathematics',
      marks: 68,
      totalMarks: 100,
      trend: 'down',
      weakTopics: ['Calculus', 'Differential Equations', 'Integration'],
      isWeak: true
    },
    {
      subject: 'Physics',
      marks: 82,
      totalMarks: 100,
      trend: 'up',
      weakTopics: ['Quantum Mechanics'],
      isWeak: false
    },
    {
      subject: 'Chemistry',
      marks: 65,
      totalMarks: 100,
      trend: 'down',
      weakTopics: ['Organic Chemistry', 'Chemical Bonding', 'Thermodynamics'],
      isWeak: true
    },
    {
      subject: 'Biology',
      marks: 88,
      totalMarks: 100,
      trend: 'up',
      weakTopics: [],
      isWeak: false
    },
    {
      subject: 'English',
      marks: 91,
      totalMarks: 100,
      trend: 'up',
      weakTopics: [],
      isWeak: false
    }
  ];

  const learningResources = [
    {
      title: 'Calculus Fundamentals: Limits and Derivatives',
      description: 'Comprehensive video series covering basic to advanced calculus concepts with step-by-step problem solving and real-world applications.',
      type: 'video',
      duration: '45 min',
      difficulty: 'intermediate',
      link: 'https://www.khanacademy.org/math/calculus-1',
      topics: ['Limits', 'Derivatives', 'Chain Rule']
    },
    {
      title: 'Organic Chemistry Reaction Mechanisms',
      description: 'Interactive tutorial explaining common organic chemistry reactions with 3D molecular visualizations and practice problems.',
      type: 'tutorial',
      duration: '1.5 hours',
      difficulty: 'advanced',
      link: 'https://www.chemguide.co.uk/mechanisms/index.html',
      topics: ['SN1/SN2 Reactions', 'Elimination', 'Addition']
    },
    {
      title: 'Differential Equations Practice Problems',
      description: 'Collection of 50+ practice problems with detailed solutions covering first and second order differential equations.',
      type: 'practice',
      duration: '2 hours',
      difficulty: 'intermediate',
      link: 'https://tutorial.math.lamar.edu/Classes/DE/DE.aspx',
      topics: ['First Order', 'Second Order', 'Applications']
    },
    {
      title: 'Integration Techniques Masterclass',
      description: 'Complete guide to integration methods including substitution, parts, partial fractions, and trigonometric integration.',
      type: 'article',
      duration: '30 min',
      difficulty: 'intermediate',
      link: 'https://www.mathsisfun.com/calculus/integration-introduction.html',
      topics: ['Substitution', 'By Parts', 'Partial Fractions']
    }
  ];

  const attendanceRecords = [
    {
      subject: 'Mathematics',
      date: '2026-01-08',
      status: 'present'
    },
    {
      subject: 'Physics',
      date: '2026-01-07',
      status: 'present'
    },
    {
      subject: 'Chemistry',
      date: '2026-01-06',
      status: 'absent'
    },
    {
      subject: 'Biology',
      date: '2026-01-05',
      status: 'present'
    },
    {
      subject: 'English',
      date: '2026-01-04',
      status: 'late'
    }
  ];

  const attendanceIrregularities = [
    'Consistent absence pattern detected on Mondays for Chemistry class over the past 3 weeks.',
    'Late arrivals increased by 40% in morning sessions compared to afternoon classes.',
    'Perfect attendance maintained in Biology and English, suggesting selective attendance behavior.'
  ];

  const performanceChartData = [
    { month: 'Aug', mathematics: 75, physics: 78, chemistry: 72, biology: 85, english: 88 },
    { month: 'Sep', mathematics: 72, physics: 80, chemistry: 70, biology: 86, english: 90 },
    { month: 'Oct', mathematics: 70, physics: 81, chemistry: 68, biology: 87, english: 89 },
    { month: 'Nov', mathematics: 68, physics: 82, chemistry: 65, biology: 88, english: 91 },
    { month: 'Dec', mathematics: 68, physics: 82, chemistry: 65, biology: 88, english: 91 }
  ];

  const missedTopics = [
    {
      name: 'Limits and Continuity',
      subject: 'Mathematics',
      date: '2025-12-15',
      description: 'Fundamental concept for understanding derivatives and integrals in calculus.',
      resourceLink: 'https://www.khanacademy.org/math/calculus-1/cs1-limits-and-continuity',
      videoLink: 'https://www.youtube.com/watch?v=riXcZT2ICjA'
    },
    {
      name: 'Electrophilic Addition Reactions',
      subject: 'Chemistry',
      date: '2025-12-18',
      description: 'Important mechanism in organic chemistry involving alkenes and electrophiles.',
      resourceLink: 'https://www.chemguide.co.uk/mechanisms/eladd/whatis.html',
      videoLink: 'https://www.youtube.com/watch?v=8pVKbMRxqYQ'
    },
    {
      name: 'Implicit Differentiation',
      subject: 'Mathematics',
      date: '2025-12-20',
      description: 'Technique for finding derivatives of implicitly defined functions.',
      resourceLink: 'https://tutorial.math.lamar.edu/Classes/CalcI/ImplicitDiff.aspx',
      videoLink: 'https://www.youtube.com/watch?v=qb40J4N1fa4'
    }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout userRole={currentUser?.role} userName={currentUser?.name}>
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                  Welcome back, {currentUser?.name}
                </h1>
                <p className="caption text-muted-foreground">
                  Here's your academic performance overview for January 2026
                </p>
              </div>
              <Button 
                variant="default" 
                iconName="FileInput" 
                iconPosition="left"
                onClick={() => navigate('/student-data-input')}
              >
                Update Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {metricsData?.map((metric, index) => (
              <MetricCard key={index} {...metric} />
            ))}
          </div>

          <div className="mb-6 md:mb-8">
            <RiskIndicator level={riskData?.level} insights={riskData?.insights} />
          </div>

          <div className="mb-6 md:mb-8">
            <QuickActions />
          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                Subject Performance
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="ArrowRight"
                iconPosition="right"
              >
                View All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {subjectsData?.map((subject, index) => (
                <SubjectPerformanceCard key={index} {...subject} />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="lg:col-span-2">
              <div id="performance-chart">
                <PerformanceChart 
                  data={performanceChartData} 
                  subjects={['mathematics', 'physics', 'chemistry', 'biology', 'english']}
                />
              </div>
            </div>
            <div>
              <AttendanceTracker 
                attendanceData={attendanceRecords}
                irregularities={attendanceIrregularities}
              />
            </div>
          </div>

          <div className="mb-6 md:mb-8">
            <MissedTopicsPanel topics={missedTopics} />
          </div>

          <div className="mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl md:text-2xl font-heading font-semibold text-foreground">
                Recommended Learning Resources
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="ExternalLink"
                iconPosition="right"
                onClick={() => navigate('/learning-resources')}
              >
                Browse All
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {learningResources?.map((resource, index) => (
                <LearningResourceCard key={index} {...resource} />
              ))}
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 md:p-6 border border-border">
            <div className="flex items-start gap-3">
              <Icon name="Shield" size={20} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="caption font-medium text-foreground mb-2">
                  Privacy & Data Protection
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Your academic data is securely stored and processed in compliance with educational privacy standards. 
                  Performance insights are generated using AI to help improve your learning outcomes. 
                  Data is shared only with authorized academic mentors and parents as per your institution's policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default StudentDashboard;