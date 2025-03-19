
import { Task, User } from "../context/TaskContext";

// Helper to generate past or future date
const getRelativeDate = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString();
};

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Alex Morgan",
    email: "alex@example.com",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Alex+Morgan&background=e50914&color=fff",
  },
  {
    id: "2",
    name: "Jordan Lee",
    email: "jordan@example.com",
    role: "manager",
    avatar: "https://ui-avatars.com/api/?name=Jordan+Lee&background=e50914&color=fff",
  },
  {
    id: "3",
    name: "Casey Kim",
    email: "casey@example.com",
    role: "member",
    avatar: "https://ui-avatars.com/api/?name=Casey+Kim&background=e50914&color=fff",
  },
  {
    id: "4",
    name: "Riley Smith",
    email: "riley@example.com",
    role: "member",
    avatar: "https://ui-avatars.com/api/?name=Riley+Smith&background=e50914&color=fff",
  },
  {
    id: "5",
    name: "Taylor Johnson",
    email: "taylor@example.com",
    role: "member",
    avatar: "https://ui-avatars.com/api/?name=Taylor+Johnson&background=e50914&color=fff",
  }
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Complete Project Proposal",
    description: "Draft and finalize the Q3 project proposal for client review.",
    assignee: "2",
    priority: "high",
    status: "completed",
    dueDate: getRelativeDate(-2),
    createdAt: getRelativeDate(-7),
    comments: [
      {
        id: "101",
        taskId: "1",
        userId: "1",
        content: "Let's make sure we include the budget breakdown.",
        createdAt: getRelativeDate(-6)
      },
      {
        id: "102",
        taskId: "1",
        userId: "2",
        content: "Completed and sent for review.",
        createdAt: getRelativeDate(-3)
      }
    ]
  },
  {
    id: "2",
    title: "User Research Interviews",
    description: "Conduct 5 user interviews for the new product feature.",
    assignee: "3",
    priority: "medium",
    status: "in-progress",
    dueDate: getRelativeDate(2),
    createdAt: getRelativeDate(-5),
    comments: [
      {
        id: "103",
        taskId: "2",
        userId: "3",
        content: "I've scheduled 3 interviews so far.",
        createdAt: getRelativeDate(-3)
      }
    ]
  },
  {
    id: "3",
    title: "Design System Update",
    description: "Update the design system with new component styles.",
    assignee: "4",
    priority: "low",
    status: "pending",
    dueDate: getRelativeDate(7),
    createdAt: getRelativeDate(-3),
    comments: []
  },
  {
    id: "4",
    title: "Quarterly Team Review",
    description: "Prepare and conduct quarterly team performance review.",
    assignee: "1",
    priority: "high",
    status: "pending",
    dueDate: getRelativeDate(1),
    createdAt: getRelativeDate(-5),
    comments: []
  },
  {
    id: "5",
    title: "Client Presentation",
    description: "Create and deliver project status presentation to the client.",
    assignee: "2",
    priority: "high",
    status: "in-progress",
    dueDate: getRelativeDate(-1),
    createdAt: getRelativeDate(-6),
    comments: [
      {
        id: "104",
        taskId: "5",
        userId: "1",
        content: "Let's review this together before the client meeting.",
        createdAt: getRelativeDate(-4)
      }
    ]
  },
  {
    id: "6",
    title: "API Integration",
    description: "Integrate the new payment API with the platform.",
    assignee: "5",
    priority: "medium",
    status: "in-progress",
    dueDate: getRelativeDate(3),
    createdAt: getRelativeDate(-4),
    comments: []
  },
  {
    id: "7",
    title: "Documentation Update",
    description: "Update user documentation for the latest release.",
    assignee: "3",
    priority: "low",
    status: "pending",
    dueDate: getRelativeDate(5),
    createdAt: getRelativeDate(-2),
    comments: []
  },
  {
    id: "8",
    title: "Bug Fixing Sprint",
    description: "Address critical bugs reported in the issue tracker.",
    assignee: "4",
    priority: "high",
    status: "in-progress",
    dueDate: getRelativeDate(0),
    createdAt: getRelativeDate(-5),
    comments: [
      {
        id: "105",
        taskId: "8",
        userId: "4",
        content: "I've fixed 3 of the 5 critical bugs.",
        createdAt: getRelativeDate(-1)
      }
    ]
  },
  {
    id: "9",
    title: "Marketing Campaign Planning",
    description: "Plan the Q4 marketing campaign with the marketing team.",
    assignee: "1",
    priority: "medium",
    status: "completed",
    dueDate: getRelativeDate(-3),
    createdAt: getRelativeDate(-10),
    comments: [
      {
        id: "106",
        taskId: "9",
        userId: "2",
        content: "Great work on this campaign plan!",
        createdAt: getRelativeDate(-4)
      }
    ]
  },
  {
    id: "10",
    title: "Vendor Contract Renewal",
    description: "Review and renew the hosting vendor contract.",
    assignee: "5",
    priority: "low",
    status: "completed",
    dueDate: getRelativeDate(-5),
    createdAt: getRelativeDate(-15),
    comments: []
  }
];

// Task Status Data for Charts
export const getTaskStatusData = () => [
  { name: "Pending", value: mockTasks.filter(t => t.status === "pending").length },
  { name: "In Progress", value: mockTasks.filter(t => t.status === "in-progress").length },
  { name: "Completed", value: mockTasks.filter(t => t.status === "completed").length },
];

// Task Priority Data for Charts
export const getTaskPriorityData = () => [
  { name: "Low", value: mockTasks.filter(t => t.priority === "low").length },
  { name: "Medium", value: mockTasks.filter(t => t.priority === "medium").length },
  { name: "High", value: mockTasks.filter(t => t.priority === "high").length },
];

// Team Task Distribution Data
export const getTeamTaskData = () => {
  return mockUsers.map(user => ({
    name: user.name.split(' ')[0],
    tasks: mockTasks.filter(task => task.assignee === user.id).length
  }));
};

// Weekly Task Completion Data
export const getWeeklyCompletionData = () => {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return days.map(day => ({
    name: day,
    completed: Math.floor(Math.random() * 5),
    created: Math.floor(Math.random() * 8)
  }));
};
