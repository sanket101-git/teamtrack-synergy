
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

// Define Task types
export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "pending" | "in-progress" | "completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string; // User ID
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string; // ISO date string
  createdAt: string; // ISO date string
  comments: Comment[];
}

export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  content: string;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "manager" | "member";
  avatar: string;
}

interface TaskContextType {
  tasks: Task[];
  users: User[];
  addTask: (task: Omit<Task, "id" | "createdAt" | "comments">) => void;
  updateTask: (id: string, taskData: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  addComment: (taskId: string, userId: string, content: string) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByAssignee: (userId: string) => Task[];
  getTasksByPriority: (priority: TaskPriority) => Task[];
  getUpcomingTasks: (days: number) => Task[];
  getOverdueTasks: () => Task[];
  getTaskStats: () => { total: number; pending: number; inProgress: number; completed: number };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode; initialData?: { tasks: Task[], users: User[] } }> = ({ 
  children, 
  initialData = { tasks: [], users: [] } 
}) => {
  const [tasks, setTasks] = useState<Task[]>(initialData.tasks);
  const [users, setUsers] = useState<User[]>(initialData.users);

  // Initialize with mock data if empty
  useEffect(() => {
    if (tasks.length === 0) {
      // This would be replaced with an API call in a real app
      import("../lib/data").then((data) => {
        setTasks(data.mockTasks);
        setUsers(data.mockUsers);
      });
    }
  }, [tasks.length]);

  const addTask = (task: Omit<Task, "id" | "createdAt" | "comments">) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      comments: []
    };
    
    setTasks((prev) => [...prev, newTask]);
    toast.success("Task created successfully");
  };

  const updateTask = (id: string, taskData: Partial<Task>) => {
    setTasks((prev) => 
      prev.map((task) => 
        task.id === id ? { ...task, ...taskData } : task
      )
    );
    toast.success("Task updated successfully");
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    toast.success("Task deleted successfully");
  };

  const addComment = (taskId: string, userId: string, content: string) => {
    const newComment: Comment = {
      id: Date.now().toString(),
      taskId,
      userId,
      content,
      createdAt: new Date().toISOString()
    };

    setTasks((prev) => 
      prev.map((task) => 
        task.id === taskId 
          ? { ...task, comments: [...task.comments, newComment] } 
          : task
      )
    );
  };

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter((task) => task.status === status);
  };

  const getTasksByAssignee = (userId: string): Task[] => {
    return tasks.filter((task) => task.assignee === userId);
  };

  const getTasksByPriority = (priority: TaskPriority): Task[] => {
    return tasks.filter((task) => task.priority === priority);
  };

  const getUpcomingTasks = (days: number): Task[] => {
    const now = new Date();
    const future = new Date();
    future.setDate(future.getDate() + days);
    
    return tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate >= now && dueDate <= future && task.status !== "completed";
    });
  };

  const getOverdueTasks = (): Task[] => {
    const now = new Date();
    
    return tasks.filter((task) => {
      const dueDate = new Date(task.dueDate);
      return dueDate < now && task.status !== "completed";
    });
  };

  const getTaskStats = () => {
    const pending = getTasksByStatus("pending").length;
    const inProgress = getTasksByStatus("in-progress").length;
    const completed = getTasksByStatus("completed").length;
    
    return {
      total: tasks.length,
      pending,
      inProgress,
      completed
    };
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        users,
        addTask,
        updateTask,
        deleteTask,
        addComment,
        getTasksByStatus,
        getTasksByAssignee,
        getTasksByPriority,
        getUpcomingTasks,
        getOverdueTasks,
        getTaskStats
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
