"use client"

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";
import axios from "axios";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalContextProvider = ({ children }) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([]);
    const [mounted, setMounted] = useState(false);

    const allTasks = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/api/tasks");

            setTasks(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error("Failed to fetch tasks:", error);
            toast.error("Failed to fetch tasks. Please try again later.");
        }
    };

    React.useEffect(() => {
        allTasks();
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    const theme = themes[selectedTheme];

    if (!mounted) {
        return null; // or a loading state
    }

    return (
        <GlobalContext.Provider value={{ theme, tasks, mounted }}>
            <GlobalUpdateContext.Provider value={{ setSelectedTheme }}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    );
}

export const useGlobalState = () => {
    return useContext(GlobalContext);
}

export const useGlobalUpdate = () => {
    return useContext(GlobalUpdateContext);
}