import React, { useState, useMemo } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import MetricsCard from './components/MetricsCard';
import FilterControls from './components/FilterControls';
import StudentTable from './components/StudentTable';
import InterventionPanel from './components/InterventionPanel';
import AnalyticsChart from './components/AnalyticsChart';
import BulkActionsBar from './components/BulkActionsBar';
import StudentDetailsModal from './components/StudentDetailsModal';

const MentorDashboard = () => {
  const [filters, setFilters] = useState({
    riskLevel: 'all',
    subject: 'all',
    performance: 'all',
  });

  const [sortConfig, setSortConfig] = useState({
    field: 'studentId',
    direction: 'asc',
  });

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedStudentDetails, setSelectedStudentDetails] = useState(null);

  const mockStudents = [
    {
      id: 1,
      studentId: "STU2024001",
      engagementScore: 45,
      riskLevel: "critical",
      weakSubjects: ["Mathematics", "Physics", "Chemistry"],
      lastUpdated: "2 hours ago",
      aiInsights: "Student shows consistent low attendance in core subjects with declining exam performance. Immediate intervention recommended focusing on foundational concepts in Mathematics and Physics. Consider one-on-one tutoring sessions and regular progress monitoring.",
      recommendations: [
        "Schedule immediate one-on-one meeting to discuss academic challenges",
        "Arrange peer tutoring sessions for Mathematics fundamentals",
        "Implement weekly progress check-ins with subject teachers",
        "Provide access to supplementary learning materials and video tutorials"
      ]
    },
    {
      id: 2,
      studentId: "STU2024002",
      engagementScore: 68,
      riskLevel: "warning",
      weakSubjects: ["Computer Science", "English"],
      lastUpdated: "5 hours ago",
      aiInsights: "Student demonstrates moderate engagement with occasional attendance gaps. Performance in Computer Science shows improvement potential with targeted support. English communication skills need enhancement through practice exercises.",
      recommendations: [
        "Encourage participation in coding practice sessions",
        "Recommend English language improvement workshops",
        "Monitor attendance patterns for early intervention",
        "Connect with study groups for collaborative learning"
      ]
    },
    {
      id: 3,
      studentId: "STU2024003",
      engagementScore: 92,
      riskLevel: "normal",
      weakSubjects: ["Biology"],
      lastUpdated: "1 day ago",
      aiInsights: "Student maintains excellent overall performance with strong engagement across most subjects. Minor weakness in Biology can be addressed through additional lab practice and concept reinforcement exercises.",
      recommendations: [
        "Provide advanced learning resources to maintain momentum",
        "Suggest Biology lab practice sessions for hands-on experience",
        "Consider mentorship opportunities for peer support",
        "Encourage participation in academic competitions"
      ]
    },
    {
      id: 4,
      studentId: "STU2024004",
      engagementScore: 55,
      riskLevel: "warning",
      weakSubjects: ["Mathematics", "Statistics"],
      lastUpdated: "3 hours ago",
      aiInsights: "Student shows inconsistent performance with particular struggles in quantitative subjects. Regular attendance but low LMS engagement suggests need for interactive learning approaches and personalized study strategies.",
      recommendations: [
        "Implement interactive problem-solving sessions",
        "Provide step-by-step learning guides for complex topics",
        "Schedule regular feedback sessions with math instructors",
        "Recommend online practice platforms for self-paced learning"
      ]
    },
    {
      id: 5,
      studentId: "STU2024005",
      engagementScore: 38,
      riskLevel: "critical",
      weakSubjects: ["Physics", "Chemistry", "Mathematics", "English"],
      lastUpdated: "1 hour ago",
      aiInsights: "Student exhibits severe academic challenges across multiple core subjects with very low engagement scores. Urgent comprehensive intervention required including academic counseling, structured study plan, and regular monitoring to prevent further decline.",
      recommendations: [
        "Arrange urgent meeting with student and academic counselor",
        "Develop comprehensive remedial study plan with clear milestones",
        "Assign dedicated mentor for daily progress tracking",
        "Coordinate with parents for home support and motivation",
        "Consider reduced course load with focus on core subjects"
      ]
    },
    {
      id: 6,
      studentId: "STU2024006",
      engagementScore: 85,
      riskLevel: "normal",
      weakSubjects: ["Chemistry"],
      lastUpdated: "6 hours ago",
      aiInsights: "Student demonstrates strong academic performance with high engagement levels. Minor weakness in Chemistry can be easily addressed through targeted practice in organic chemistry concepts and reaction mechanisms.",
      recommendations: [
        "Provide advanced Chemistry practice problems",
        "Suggest participation in chemistry lab workshops",
        "Encourage peer teaching to reinforce understanding",
        "Maintain current study habits and engagement levels"
      ]
    },
    {
      id: 7,
      studentId: "STU2024007",
      engagementScore: 72,
      riskLevel: "normal",
      weakSubjects: ["English", "Biology"],
      lastUpdated: "4 hours ago",
      aiInsights: "Student shows good overall performance with room for improvement in language and life sciences. Consistent attendance and moderate LMS engagement indicate receptiveness to additional support and guidance.",
      recommendations: [
        "Recommend English writing workshops for communication skills",
        "Provide Biology concept maps for better understanding",
        "Encourage participation in science club activities",
        "Schedule periodic review sessions for weak topics"
      ]
    },
    {
      id: 8,
      studentId: "STU2024008",
      engagementScore: 48,
      riskLevel: "critical",
      weakSubjects: ["Mathematics", "Physics", "Computer Science"],
      lastUpdated: "30 minutes ago",
      aiInsights: "Student faces significant challenges in technical subjects with declining engagement patterns. Low LMS login frequency and poor exam performance indicate need for immediate structured intervention and motivational support.",
      recommendations: [
        "Conduct comprehensive academic assessment meeting",
        "Develop personalized learning plan with achievable goals",
        "Arrange intensive tutoring for foundational concepts",
        "Implement daily check-ins to monitor progress and motivation",
        "Connect with career counseling for goal alignment"
      ]
    }
  ];

  const mockInterventions = {
    pending: [
      {
        id: 1,
        studentId: "STU2024001",
        message: "Critical risk level detected - Multiple subject failures and low attendance",
        timestamp: "2 hours ago",
        status: "urgent",
        type: "Academic Alert"
      },
      {
        id: 2,
        studentId: "STU2024005",
        message: "Severe engagement drop - No LMS login for 7 days",
        timestamp: "1 hour ago",
        status: "urgent",
        type: "Engagement Alert"
      },
      {
        id: 3,
        studentId: "STU2024004",
        message: "Warning level - Declining performance in quantitative subjects",
        timestamp: "3 hours ago",
        status: "urgent",
        type: "Performance Alert"
      }
    ],
    recent: [
      {
        id: 4,
        studentId: "STU2024002",
        message: "Personalized learning guidance email sent successfully",
        timestamp: "Yesterday",
        status: "sent",
        type: "Email Notification"
      },
      {
        id: 5,
        studentId: "STU2024003",
        message: "Performance improvement acknowledgment sent to student",
        timestamp: "2 days ago",
        status: "sent",
        type: "Email Notification"
      },
      {
        id: 6,
        studentId: "STU2024006",
        message: "Weekly progress summary shared with student",
        timestamp: "3 days ago",
        status: "sent",
        type: "Email Notification"
      }
    ],
    followup: [
      {
        id: 7,
        studentId: "STU2024001",
        message: "Follow-up meeting scheduled for academic intervention",
        timestamp: "Tomorrow 10:00 AM",
        status: "scheduled",
        type: "Meeting"
      },
      {
        id: 8,
        studentId: "STU2024008",
        message: "Second follow-up required - Previous intervention incomplete",
        timestamp: "In 2 days",
        status: "scheduled",
        type: "Follow-up"
      }
    ]
  };

  const mockEngagementTrend = [
    { name: "Week 1", value: 75, comparison: 70 },
    { name: "Week 2", value: 72, comparison: 68 },
    { name: "Week 3", value: 68, comparison: 65 },
    { name: "Week 4", value: 70, comparison: 67 },
    { name: "Week 5", value: 73, comparison: 71 },
    { name: "Week 6", value: 76, comparison: 74 }
  ];

  const mockRiskDistribution = [
    { name: "Critical", value: 3 },
    { name: "Warning", value: 2 },
    { name: "Normal", value: 3 }
  ];

  const filteredStudents = useMemo(() => {
    return mockStudents?.filter(student => {
      if (filters?.riskLevel !== 'all' && student?.riskLevel !== filters?.riskLevel) {
        return false;
      }
      if (filters?.subject !== 'all' && !student?.weakSubjects?.some(s => 
        s?.toLowerCase()?.replace(/\s+/g, '-') === filters?.subject
      )) {
        return false;
      }
      if (filters?.performance !== 'all') {
        const score = student?.engagementScore;
        if (filters?.performance === 'excellent' && (score < 90 || score > 100)) return false;
        if (filters?.performance === 'good' && (score < 75 || score >= 90)) return false;
        if (filters?.performance === 'average' && (score < 60 || score >= 75)) return false;
        if (filters?.performance === 'below-average' && score >= 60) return false;
      }
      return true;
    });
  }, [filters]);

  const sortedStudents = useMemo(() => {
    const sorted = [...filteredStudents];
    sorted?.sort((a, b) => {
      let aValue = a?.[sortConfig?.field];
      let bValue = b?.[sortConfig?.field];

      if (sortConfig?.field === 'riskLevel') {
        const riskOrder = { critical: 0, warning: 1, normal: 2 };
        aValue = riskOrder?.[a?.riskLevel];
        bValue = riskOrder?.[b?.riskLevel];
      }

      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredStudents, sortConfig]);

  const metrics = useMemo(() => {
    const critical = mockStudents?.filter(s => s?.riskLevel === 'critical')?.length;
    const warning = mockStudents?.filter(s => s?.riskLevel === 'warning')?.length;
    const normal = mockStudents?.filter(s => s?.riskLevel === 'normal')?.length;
    const avgEngagement = Math.round(
      mockStudents?.reduce((sum, s) => sum + s?.engagementScore, 0) / mockStudents?.length
    );

    return {
      critical,
      warning,
      normal,
      avgEngagement,
      total: mockStudents?.length
    };
  }, []);

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleResetFilters = () => {
    setFilters({
      riskLevel: 'all',
      subject: 'all',
      performance: 'all',
    });
  };

  const handleSort = (field) => {
    setSortConfig(prev => ({
      field,
      direction: prev?.field === field && prev?.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const handleSelectStudent = (studentId, checked) => {
    setSelectedStudents(prev =>
      checked ? [...prev, studentId] : prev?.filter(id => id !== studentId)
    );
  };

  const handleSelectAll = (checked) => {
    setSelectedStudents(checked ? sortedStudents?.map(s => s?.id) : []);
  };

  const handleViewDetails = (student) => {
    setSelectedStudentDetails(student);
  };

  const handleSendBulkEmail = () => {
    alert(`Sending personalized emails to ${selectedStudents?.length} selected students`);
  };

  const handleScheduleBulkMeeting = () => {
    alert(`Scheduling intervention meetings for ${selectedStudents?.length} selected students`);
  };

  const handleClearSelection = () => {
    setSelectedStudents([]);
  };

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/mentor-dashboard' },
    { label: 'Student Monitoring' }
  ];

  return (
    <MainLayout userRole="mentor" userName="Dr. Sarah Johnson">
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-foreground mb-2">
              Mentor Dashboard
            </h1>
            <p className="text-sm md:text-base text-muted-foreground">
              Monitor student performance and manage interventions across your cohort
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <MetricsCard
              title="Critical Risk"
              value={metrics?.critical}
              subtitle={`${Math.round((metrics?.critical / metrics?.total) * 100)}% of total students`}
              icon="AlertTriangle"
              variant="danger"
              trend="down"
              trendValue="12%"
            />
            <MetricsCard
              title="Warning Level"
              value={metrics?.warning}
              subtitle={`${Math.round((metrics?.warning / metrics?.total) * 100)}% of total students`}
              icon="AlertCircle"
              variant="warning"
              trend="up"
              trendValue="5%"
            />
            <MetricsCard
              title="Normal Status"
              value={metrics?.normal}
              subtitle={`${Math.round((metrics?.normal / metrics?.total) * 100)}% of total students`}
              icon="CheckCircle"
              variant="success"
              trend="up"
              trendValue="8%"
            />
            <MetricsCard
              title="Avg Engagement"
              value={`${metrics?.avgEngagement}%`}
              subtitle="Across all students"
              icon="TrendingUp"
              variant="default"
              trend="up"
              trendValue="3%"
            />
          </div>

          <FilterControls
            filters={filters}
            onFilterChange={handleFilterChange}
            onReset={handleResetFilters}
            studentCount={sortedStudents?.length}
          />

          <div className="mb-6 md:mb-8">
            <StudentTable
              students={sortedStudents}
              onSort={handleSort}
              sortConfig={sortConfig}
              onViewDetails={handleViewDetails}
              selectedStudents={selectedStudents}
              onSelectStudent={handleSelectStudent}
              onSelectAll={handleSelectAll}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <AnalyticsChart
              data={mockEngagementTrend}
              type="line"
              title="Engagement Trends"
              description="Weekly average engagement scores with comparison"
            />
            <AnalyticsChart
              data={mockRiskDistribution}
              type="bar"
              title="Risk Distribution"
              description="Current student distribution across risk levels"
            />
          </div>

          <InterventionPanel
            interventions={mockInterventions}
            onSendEmail={(studentId) => alert(`Sending email to ${studentId}`)}
            onScheduleMeeting={(studentId) => alert(`Scheduling meeting with ${studentId}`)}
          />
        </div>

        <BulkActionsBar
          selectedCount={selectedStudents?.length}
          onSendBulkEmail={handleSendBulkEmail}
          onScheduleBulkMeeting={handleScheduleBulkMeeting}
          onClearSelection={handleClearSelection}
        />

        {selectedStudentDetails && (
          <StudentDetailsModal
            student={selectedStudentDetails}
            onClose={() => setSelectedStudentDetails(null)}
          />
        )}
      </div>
    </MainLayout>
  );
};

export default MentorDashboard;