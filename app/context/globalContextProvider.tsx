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
    setIsLoading(true);
    try {
      const res = await axios.delete(`/api/${id}`);

      if (res.data.error) {
        toast.error(res.data.error);
        setIsLoading(false);
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

      setIsLoading(false);
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
