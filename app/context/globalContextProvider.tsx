'use client';

import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';
import themes from './themes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useUser } from '@clerk/nextjs';

// Define types
interface Task {
  id: string;
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  userId: string;
  createAt: string;
  updatedAt: string;
}

interface GlobalContextType {
  theme: any;
  tasks: Task[];
  deleteTask: (id: string) => Promise<void>;
  allTasks: () => Promise<void>;
  mounted: boolean;
  isLoading: boolean;
  completedTasks: Task[];
  important: Task[];
  incompleteTasks: Task[];
  updateTask: (id: string, isCompleted: boolean) => Promise<void>;
  editTask: (
    id: string,
    updates: { title?: string; description?: string; date?: string }
  ) => Promise<void>;
}

interface GlobalContextProviderProps {
  children: ReactNode;
}

// Create context with proper typing
export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);
export const GlobalUpdateContext = createContext<any>(undefined);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [mounted, setMounted] = useState(false);

  const allTasks = async (): Promise<void> => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/tasks');
      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to fetch tasks. Please try again later.');
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: string): Promise<void> => {
    try {
      const res = await axios.delete(`/api/${id}`);

      if (res.data.error) {
        toast.error(res.data.error);
        return;
      }

      toast.success('Task deleted successfully');
      allTasks();
    } catch (error: any) {
      console.error('Error deleting task:', error);

      // Provide more specific error messages
      if (error.response?.status === 401) {
        toast.error('Unauthorized. Please sign in again.');
      } else if (error.response?.status === 404) {
        toast.error('Task not found or already deleted.');
      } else if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error('Failed to delete task. Please try again.');
      }
    }
  };

  const updateTask = async (
    id: string,
    isCompleted: boolean
  ): Promise<void> => {
    try {
      await axios.put(`/api/tasks`, { id, isCompleted });

      // Optimistically update the task in local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, isCompleted } : task
        )
      );

      toast.success('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      toast.error('Failed to update task. Please try again.');
      // Optionally, re-sync with server if needed
      // allTasks();
    }
  };

  const editTask = async (
    id: string,
    updates: { title?: string; description?: string; date?: string }
  ): Promise<void> => {
    try {
      await axios.put(`/api/tasks`, { id, ...updates });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...task, ...updates } : task
        )
      );
      toast.success('Task edited successfully');
    } catch (error) {
      console.error('Error editing task:', error);
      toast.error('Failed to edit task. Please try again.');
    }
  };

  // Filter tasks
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const important = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  React.useEffect(() => {
    if (user) {
      allTasks();
    }
  }, [user]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const theme = themes[selectedTheme];

  return (
    <GlobalContext.Provider
      value={{
        theme,
        tasks,
        deleteTask,
        allTasks,
        updateTask,
        editTask,
        mounted,
        isLoading,
        completedTasks,
        important,
        incompleteTasks,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error(
      'useGlobalState must be used within a GlobalContextProvider'
    );
  }
  return context;
};

export const useGlobalUpdate = () => {
  return useContext(GlobalUpdateContext);
};
