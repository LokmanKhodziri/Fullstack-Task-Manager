'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import themes from './themes';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setUser, useUser } from '@clerk/nextjs';

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalContextProvider = ({ children }) => {
  const { user } = useUser();
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [mounted, setMounted] = useState(false);

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get('/api/tasks');

      setTasks(res.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to fetch tasks. Please try again later.');
    }
  };

  const deleteTask = async (id) => {
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
    } catch (error) {
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);

export const useGlobalUpdate = () => {
  return useContext(GlobalUpdateContext);
};
