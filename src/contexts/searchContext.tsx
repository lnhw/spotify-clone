"use client";

import React, { createContext, useState } from "react";

interface SearchContextProp {
    results: any;
    setResults: React.Dispatch<React.SetStateAction<any[]>>
}
export const SearchContext = createContext<SearchContextProp | undefined>({
    results: [],
    setResults: () => { }
});

export const SearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [results, setResults] = useState<any[]>([]);
    
    return (
        <SearchContext.Provider value={{ results, setResults }}>
            {children}
        </SearchContext.Provider>
    );
}