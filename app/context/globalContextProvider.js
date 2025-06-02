"use client"

import React, { createContext, useState, useContext, useEffect } from "react";
import themes from "./themes";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalContextProvider = ({children}) => {
    const [selectedTheme, setSelectedTheme] = useState(0);
    const [mounted, setMounted] = useState(false);
    
    useEffect(() => {
        setMounted(true);
    }, []);

    const theme = themes[selectedTheme];
    
    if (!mounted) {
        return null; // or a loading state
    }
    
    return (
        <GlobalContext.Provider value={{theme}}>
            <GlobalUpdateContext.Provider value={{setSelectedTheme}}>
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