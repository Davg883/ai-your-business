"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type ThemeMode = "field" | "exec";

interface ThemeContextType {
    mode: ThemeMode;
    setMode: (mode: ThemeMode) => void;
    toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setMode] = useState<ThemeMode>("field");

    const toggleMode = () => {
        setMode((prev) => (prev === "field" ? "exec" : "field"));
    };

    return (
        <ThemeContext.Provider value={{ mode, setMode, toggleMode }}>
            <div className={mode === "field" ? "theme-field" : "theme-exec"}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useThemeMode() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useThemeMode must be used within a ThemeProvider");
    }
    return context;
}
