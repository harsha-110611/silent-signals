import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import StudentOverviewCard from './components/StudentOverviewCard';
import PerformanceAnalysis from './components/PerformanceAnalysis';
import NotificationCenter from './components/NotificationCenter';
import KeyMetrics from './components/KeyMetrics';
import CommunicationPanel from './components/CommunicationPanel';

const ParentDashboard = () => {
  const studentData = {
    name: "Sarah Johnson",
    studentId: "STU2024-1847",
    program: "Computer Science Engineering",
    attendance: 78,
    averageScore: 72,
    engagementScore: 65,
    riskLevel: "Warning",
    riskDescription: "Attendance below threshold and declining engagement in core subjects require attention",
    lastUpdated: "January 8, 2026 at 2:30 PM",
    lmsLogins: 12
  };

  const subjects = [
    {
      id: 1,
      name: "Data Structures & Algorithms",
      credits: 4,
      semester: "Fall 2025",
      score: 68,
      grade: "C+",
      attendance: 72,
      assignmentsCompleted: 7,
      totalAssignments: 10,
      weakAreas: [
        "Graph algorithms and traversal techniques",
        "Dynamic programming optimization problems",
        "Time complexity analysis for recursive functions"
      ],
      aiInsight: "Student shows strong understanding of basic data structures but struggles with advanced algorithmic concepts. Recommend focused practice on graph theory and dynamic programming with step-by-step problem solving approach.",
      missedTopics: ["Dijkstra\'s Algorithm", "Floyd-Warshall", "Knapsack Problem"]
    },
    {
      id: 2,
      name: "Database Management Systems",
      credits: 3,
      semester: "Fall 2025",
      score: 82,
      grade: "B+",
      attendance: 88,
      assignmentsCompleted: 9,
      totalAssignments: 10,
      weakAreas: [
        "Query optimization techniques",
        "Transaction management and ACID properties"
      ],
      aiInsight: "Strong performance in database design and SQL fundamentals. Minor gaps in advanced optimization concepts can be addressed through practical exercises and case studies.",
      missedTopics: ["Indexing Strategies", "Concurrency Control"]
    },
    {
      id: 3,
      name: "Operating Systems",
      credits: 4,
      semester: "Fall 2025",
      score: 65,
      grade: "C",
      attendance: 70,
      assignmentsCompleted: 6,
      totalAssignments: 10,
      weakAreas: [
        "Process synchronization and deadlock prevention",
        "Memory management and virtual memory concepts",
        "File system implementation details"
      ],
      aiInsight: "Conceptual understanding needs strengthening through practical implementation exercises. Recommend hands-on projects with process scheduling and memory management simulations.",
      missedTopics: ["Semaphores", "Page Replacement", "Disk Scheduling"]
    },
    {
      id: 4,
      name: "Computer Networks",
      credits: 3,
      semester: "Fall 2025",
      score: 75,
      grade: "B",
      attendance: 82,
      assignmentsCompleted: 8,
      totalAssignments: 10,
      weakAreas: [
        "Network layer protocols and routing algorithms",
        "Transport layer congestion control mechanisms"
      ],
      aiInsight: "Good grasp of network fundamentals with room for improvement in protocol analysis. Additional practice with network simulation tools would enhance understanding.",
      missedTopics: ["BGP Protocol", "TCP Congestion Control"]
    }
  ];

  const notifications = [
    {
      id: 1,
      type: "alert",
      title: "Attendance Alert - Critical Threshold",
      message: "Sarah's attendance in Operating Systems has dropped to 70%, which is below the required 75% threshold. Immediate attention recommended to avoid academic penalties.",
      timestamp: "January 8, 2026 at 9:15 AM",
      channel: "Email",
      read: false
    },
    {
      id: 2,
      type: "summary",
      title: "Weekly Academic Summary",
      message: "This week Sarah completed 3 assignments with an average score of 74%. Engagement in Data Structures course shows improvement with 5 LMS logins. Overall progress is steady but requires consistent effort.",
      timestamp: "January 7, 2026 at 6:00 PM",
      channel: "Email",
      read: true
    },
    {
      id: 3,
      type: "intervention",
      title: "Mentor Intervention Recommended",
      message: "Based on AI analysis, Sarah would benefit from one-on-one mentoring sessions focusing on algorithmic problem-solving techniques. Mentor Dr. Robert Chen has been notified and is available for consultation.",
      timestamp: "January 6, 2026 at 3:45 PM",
      channel: "Email & SMS",
      read: true
    },
    {
      id: 4,
      type: "progress",
      title: "Positive Progress Update",
      message: "Sarah has shown significant improvement in Database Management Systems with a 12% increase in assignment scores over the past two weeks. Continue encouraging this positive trend.",
      timestamp: "January 5, 2026 at 11:30 AM",
      channel: "Email",
      read: true
    },
    {
      id: 5,
      type: "alert",
      title: "Missing Assignment Notification",
      message: "Two assignments in Operating Systems are pending submission. Deadline is January 10, 2026. Please ensure Sarah completes these to maintain academic standing.",
      timestamp: "January 4, 2026 at 2:00 PM",
      channel: "Email",
      read: true
    }
  ];

  const metrics = [
    {
      id: 1,
      type: "engagement",
      label: "Student Engagement",
      value: 65,
      unit: "/100",
      percentage: 65,
      trend: -8,
      description: "Based on LMS activity, assignment completion, and class participation"
    },
    {
      id: 2,
      type: "attendance",
      label: "Overall Attendance",
      value: 78,
      unit: "%",
      percentage: 78,
      trend: -5,
      description: "Average attendance across all enrolled courses this semester"
    },
    {
      id: 3,
      type: "resources",
      label: "Learning Resources Used",
      value: 24,
      unit: "items",
      percentage: 60,
      trend: 12,
      description: "Number of recommended resources accessed in the past 30 days"
    },
    {
      id: 4,
      type: "performance",
      label: "Academic Performance",
      value: 72,
      unit: "%",
      percentage: 72,
      trend: 3,
      description: "Weighted average of all course scores and assignment grades"
    }
  ];

  const communications = [
    {
      id: 1,
      sender: "System",
      subject: "Automated Weekly Progress Report",
      message: "Your child's academic performance summary for the week of January 1-7, 2026 has been generated. Overall engagement score is 65/100 with notable improvements in Database Management Systems. Areas requiring attention include Operating Systems attendance and Data Structures assignment completion.",
      timestamp: "January 7, 2026 at 6:00 PM",
      status: "read",
      requiresAction: false
    },
    {
      id: 2,
      sender: "Dr. Robert Chen (Academic Mentor)",
      subject: "Mentoring Session Recommendation",
      message: "Based on recent performance analysis, I recommend scheduling a one-on-one session with Sarah to discuss strategies for improving algorithmic problem-solving skills. I have availability this week on Thursday and Friday afternoons.",
      timestamp: "January 6, 2026 at 4:15 PM",
      status: "read",
      requiresAction: true
    },
    {
      id: 3,
      sender: "System",
      subject: "Critical Attendance Alert",
      message: "This is an automated notification regarding Sarah's attendance in Operating Systems course. Current attendance is 70%, which is below the institutional requirement of 75%. Please take necessary action to improve attendance to avoid academic consequences.",
      timestamp: "January 5, 2026 at 10:00 AM",
      status: "delivered",
      requiresAction: true
    },
    {
      id: 4,
      sender: "Prof. Emily Watson (Course Instructor)",
      subject: "Assignment Deadline Reminder",
      message: "This is a reminder that two assignments in Operating Systems are due on January 10, 2026. Please ensure Sarah submits these on time. If she needs any clarification or extension, please contact me before the deadline.",
      timestamp: "January 4, 2026 at 2:30 PM",
      status: "read",
      requiresAction: false
    },
    {
      id: 5,
      sender: "System",
      subject: "Positive Progress Notification",
      message: "Great news! Sarah has shown consistent improvement in Database Management Systems with a 12% increase in assignment scores. Her engagement in this course has been exemplary. Keep encouraging this positive momentum.",
      timestamp: "January 3, 2026 at 5:45 PM",
      status: "read",
      requiresAction: false
    }
  ];

  const breadcrumbItems = [
    { label: 'Home', path: '/student-dashboard' },
    { label: 'Parent Dashboard', path: '/parent-dashboard' }
  ];

  return (
    <MainLayout userRole="parent" userName="Michael Johnson">
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8 lg:py-10">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mb-6 md:mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2">
              Parent Dashboard
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Monitor your child's academic progress and receive timely updates
            </p>
          </div>

          <div className="space-y-6 md:space-y-8">
            <StudentOverviewCard studentData={studentData} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              <NotificationCenter notifications={notifications} />
              <KeyMetrics metrics={metrics} />
            </div>

            <PerformanceAnalysis subjects={subjects} />

            <CommunicationPanel communications={communications} />

            <div className="bg-muted/30 rounded-lg border border-border p-4 md:p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 mt-1">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">Privacy & Data Protection</h4>
                  <p className="caption text-muted-foreground leading-relaxed">
                    All student data is protected under educational privacy regulations. Information is shared only with authorized parents and academic mentors. AI-powered insights are generated using anonymized data patterns to ensure student privacy while providing meaningful academic support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default ParentDashboard;