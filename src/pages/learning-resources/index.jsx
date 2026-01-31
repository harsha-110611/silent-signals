import React, { useState, useMemo } from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Breadcrumb from '../../components/navigation/Breadcrumb';
import Icon from '../../components/AppIcon';

import FilterPanel from './components/FilterPanel';
import SubjectSection from './components/SubjectSection';
import MissedTopicsSection from './components/MissedTopicsSection';
import StatsOverview from './components/StatsOverview';
import SearchBar from './components/SearchBar';

const LearningResources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState([2, 5, 8]);
  const [filters, setFilters] = useState({
    type: 'all',
    difficulty: 'all',
    duration: 'all',
    sortBy: 'relevance',
    showBookmarked: false,
    showInProgress: false
  });

  const mockMissedTopics = [
    {
      id: 1,
      name: "Differential Equations",
      subject: "Mathematics",
      description: "Understanding first and second-order differential equations with applications in physics and engineering problems.",
      priority: "high",
      resourceCount: 8
    },
    {
      id: 2,
      name: "Organic Chemistry Reactions",
      subject: "Chemistry",
      description: "Mastering nucleophilic substitution reactions, elimination reactions, and reaction mechanisms in organic chemistry.",
      priority: "high",
      resourceCount: 12
    },
    {
      id: 3,
      name: "Data Structures - Trees",
      subject: "Computer Science",
      description: "Binary trees, AVL trees, and tree traversal algorithms with implementation and time complexity analysis.",
      priority: "medium",
      resourceCount: 6
    },
    {
      id: 4,
      name: "Thermodynamics Laws",
      subject: "Physics",
      description: "First and second laws of thermodynamics with entropy concepts and real-world applications in heat engines.",
      priority: "medium",
      resourceCount: 5
    }
  ];

  const mockResources = [
    {
      id: 1,
      title: "Introduction to Differential Equations",
      description: "Comprehensive video series covering first-order differential equations with step-by-step solutions and real-world applications in engineering and physics.",
      type: "video",
      difficulty: "beginner",
      duration: "45 min",
      relevanceScore: 95,
      subject: "Mathematics",
      topics: ["First-order equations", "Separable equations", "Linear equations", "Applications"],
      link: "https://www.khanacademy.org/math/differential-equations",
      progress: 0
    },
    {
      id: 2,
      title: "Solving Complex Differential Equations",
      description: "Advanced tutorial on second-order differential equations with homogeneous and non-homogeneous solutions including practical problem-solving techniques.",
      type: "tutorial",
      difficulty: "advanced",
      duration: "60 min",
      relevanceScore: 92,
      subject: "Mathematics",
      topics: ["Second-order equations", "Homogeneous solutions", "Non-homogeneous solutions", "Laplace transforms"],
      link: "https://www.coursera.org/learn/differential-equations",
      progress: 35
    },
    {
      id: 3,
      title: "Differential Equations Practice Problems",
      description: "Interactive exercise set with 50+ problems ranging from basic to advanced difficulty levels with detailed solutions and explanations.",
      type: "exercise",
      difficulty: "intermediate",
      duration: "30 min",
      relevanceScore: 88,
      subject: "Mathematics",
      topics: ["Practice problems", "Solution techniques", "Applications"],
      link: "https://www.brilliant.org/courses/differential-equations/",
      progress: 0
    },
    {
      id: 4,
      title: "Organic Chemistry Reaction Mechanisms",
      description: "Detailed video lectures explaining nucleophilic substitution and elimination reactions with arrow-pushing mechanisms and stereochemistry considerations.",
      type: "video",
      difficulty: "intermediate",
      duration: "55 min",
      relevanceScore: 94,
      subject: "Chemistry",
      topics: ["SN1 reactions", "SN2 reactions", "E1 reactions", "E2 reactions", "Stereochemistry"],
      link: "https://www.khanacademy.org/science/organic-chemistry",
      progress: 0
    },
    {
      id: 5,
      title: "Organic Synthesis Strategies",
      description: "Advanced guide to planning multi-step organic synthesis with retrosynthetic analysis and functional group transformations.",
      type: "article",
      difficulty: "advanced",
      duration: "40 min",
      relevanceScore: 90,
      subject: "Chemistry",
      topics: ["Retrosynthesis", "Functional groups", "Protecting groups", "Synthesis planning"],
      link: "https://www.masterorganicchemistry.com/",
      progress: 60
    },
    {
      id: 6,
      title: "Organic Chemistry Reaction Quiz",
      description: "Test your knowledge with 30 questions covering major organic chemistry reactions including mechanisms and product predictions.",
      type: "quiz",
      difficulty: "intermediate",
      duration: "25 min",
      relevanceScore: 85,
      subject: "Chemistry",
      topics: ["Reaction mechanisms", "Product prediction", "Reagent selection"],
      link: "https://www.chemguide.co.uk/organicprops/",
      progress: 0
    },
    {
      id: 7,
      title: "Binary Trees and Tree Traversals",
      description: "Comprehensive tutorial on binary tree data structures with implementation in multiple programming languages and traversal algorithms.",
      type: "tutorial",
      difficulty: "beginner",
      duration: "50 min",
      relevanceScore: 93,
      subject: "Computer Science",
      topics: ["Binary trees", "Inorder traversal", "Preorder traversal", "Postorder traversal", "Level-order traversal"],
      link: "https://www.geeksforgeeks.org/binary-tree-data-structure/",
      progress: 0
    },
    {
      id: 8,
      title: "AVL Trees and Self-Balancing",
      description: "Advanced data structures course covering AVL tree rotations, balancing operations, and time complexity analysis with practical implementations.",
      type: "video",
      difficulty: "advanced",
      duration: "65 min",
      relevanceScore: 89,
      subject: "Computer Science",
      topics: ["AVL trees", "Tree rotations", "Balancing factor", "Time complexity"],
      link: "https://www.coursera.org/learn/data-structures",
      progress: 20
    },
    {
      id: 9,
      title: "Tree Data Structures Practice",
      description: "Coding exercises with 40+ problems on tree implementations, traversals, and common tree algorithms with automated testing.",
      type: "exercise",
      difficulty: "intermediate",
      duration: "35 min",
      relevanceScore: 87,
      subject: "Computer Science",
      topics: ["Tree implementation", "Algorithm practice", "Problem solving"],
      link: "https://leetcode.com/tag/tree/",
      progress: 0
    },
    {
      id: 10,
      title: "Thermodynamics First Law Explained",
      description: "Clear explanation of the first law of thermodynamics with energy conservation principles and practical applications in heat engines.",
      type: "video",
      difficulty: "beginner",
      duration: "40 min",
      relevanceScore: 91,
      subject: "Physics",
      topics: ["First law", "Energy conservation", "Heat transfer", "Work done"],
      link: "https://www.khanacademy.org/science/physics/thermodynamics",
      progress: 0
    },
    {
      id: 11,
      title: "Entropy and Second Law of Thermodynamics",
      description: "Advanced concepts in thermodynamics covering entropy, reversible processes, and the second law with real-world examples.",
      type: "article",
      difficulty: "advanced",
      duration: "45 min",
      relevanceScore: 88,
      subject: "Physics",
      topics: ["Entropy", "Second law", "Reversible processes", "Carnot cycle"],
      link: "https://www.physicsclassroom.com/class/thermod",
      progress: 45
    },
    {
      id: 12,
      title: "Thermodynamics Problem Solving",
      description: "Practice problems covering all aspects of thermodynamics with detailed solutions and step-by-step explanations.",
      type: "exercise",
      difficulty: "intermediate",
      duration: "30 min",
      relevanceScore: 86,
      subject: "Physics",
      topics: ["Problem solving", "Calculations", "Applications"],
      link: "https://www.physicsforums.com/forums/thermodynamics/",
      progress: 0
    }
  ];

  const subjects = [
    { name: "Mathematics", priority: "high", missedTopics: 1 },
    { name: "Chemistry", priority: "high", missedTopics: 1 },
    { name: "Computer Science", priority: "medium", missedTopics: 1 },
    { name: "Physics", priority: "medium", missedTopics: 1 }
  ];

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      type: 'all',
      difficulty: 'all',
      duration: 'all',
      sortBy: 'relevance',
      showBookmarked: false,
      showInProgress: false
    });
  };

  const handleBookmark = (resourceId) => {
    setBookmarkedIds(prev => 
      prev?.includes(resourceId) 
        ? prev?.filter(id => id !== resourceId)
        : [...prev, resourceId]
    );
  };

  const handleTopicClick = (topic) => {
    setSearchQuery(topic?.name);
    setIsFilterOpen(false);
  };

  const filteredResources = useMemo(() => {
    let filtered = mockResources;

    if (searchQuery) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(resource =>
        resource?.title?.toLowerCase()?.includes(query) ||
        resource?.description?.toLowerCase()?.includes(query) ||
        resource?.subject?.toLowerCase()?.includes(query) ||
        resource?.topics?.some(topic => topic?.toLowerCase()?.includes(query))
      );
    }

    if (filters?.type !== 'all') {
      filtered = filtered?.filter(r => r?.type === filters?.type);
    }

    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(r => r?.difficulty === filters?.difficulty);
    }

    if (filters?.duration !== 'all') {
      filtered = filtered?.filter(r => {
        const minutes = parseInt(r?.duration);
        if (filters?.duration === 'short') return minutes < 15;
        if (filters?.duration === 'medium') return minutes >= 15 && minutes <= 30;
        if (filters?.duration === 'long') return minutes > 30;
        return true;
      });
    }

    if (filters?.showBookmarked) {
      filtered = filtered?.filter(r => bookmarkedIds?.includes(r?.id));
    }

    if (filters?.showInProgress) {
      filtered = filtered?.filter(r => r?.progress > 0 && r?.progress < 100);
    }

    filtered?.sort((a, b) => {
      if (filters?.sortBy === 'relevance') return b?.relevanceScore - a?.relevanceScore;
      if (filters?.sortBy === 'duration') return parseInt(a?.duration) - parseInt(b?.duration);
      if (filters?.sortBy === 'difficulty') {
        const order = { beginner: 1, intermediate: 2, advanced: 3 };
        return order?.[a?.difficulty] - order?.[b?.difficulty];
      }
      return 0;
    });

    return filtered;
  }, [mockResources, searchQuery, filters, bookmarkedIds]);

  const resourcesBySubject = useMemo(() => {
    const grouped = {};
    subjects?.forEach(subject => {
      grouped[subject.name] = filteredResources?.filter(r => r?.subject === subject?.name);
    });
    return grouped;
  }, [filteredResources, subjects]);

  const stats = useMemo(() => ({
    totalResources: mockResources?.length,
    inProgress: mockResources?.filter(r => r?.progress > 0 && r?.progress < 100)?.length,
    completed: mockResources?.filter(r => r?.progress === 100)?.length,
    bookmarked: bookmarkedIds?.length
  }), [mockResources, bookmarkedIds]);

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/student-dashboard' },
    { label: 'Learning Resources', path: '/learning-resources' }
  ];

  return (
    <MainLayout userRole="student" userName="Rahul Sharma">
      <div className="min-h-screen bg-background">
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-6 md:py-8">
          <Breadcrumb items={breadcrumbItems} />

          <div className="mb-6 md:mb-8">
            <div className="flex items-start justify-between gap-4 mb-2">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                  Learning Resources
                </h1>
                <p className="text-sm md:text-base text-muted-foreground">
                  Personalized learning materials based on your performance analysis and identified areas for improvement
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <StatsOverview stats={stats} />
          </div>

          <div className="mb-6">
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              onFilterToggle={() => setIsFilterOpen(true)}
            />
          </div>

          <div className="mb-6">
            <MissedTopicsSection 
              topics={mockMissedTopics}
              onTopicClick={handleTopicClick}
            />
          </div>

          <div className="flex gap-6">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isMobileOpen={isFilterOpen}
              onMobileClose={() => setIsFilterOpen(false)}
            />

            <div className="flex-1 min-w-0 space-y-6">
              {filteredResources?.length === 0 ? (
                <div className="bg-card rounded-lg border border-border p-8 md:p-12 text-center">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={32} className="text-muted-foreground" />
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    No Resources Found
                  </h3>
                  <p className="caption text-muted-foreground mb-4">
                    Try adjusting your filters or search query to find relevant learning materials
                  </p>
                </div>
              ) : (
                subjects?.map(subject => {
                  const subjectResources = resourcesBySubject?.[subject?.name];
                  if (!subjectResources || subjectResources?.length === 0) return null;
                  
                  return (
                    <SubjectSection
                      key={subject?.name}
                      subject={subject}
                      resources={subjectResources}
                      bookmarkedIds={bookmarkedIds}
                      onBookmark={handleBookmark}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LearningResources;