"use client";

import { createContext, useEffect, useState } from "react";

export const providerContext = createContext({
    provider: { name: "", url: "" },
    setProvider: (s: string, u: string) => {},
});

export default function MovieProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    let [provider, setProviderC] = useState({ name: "", url: "" });

    let [isLoad, isDataLoad] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("Provider")) {
            let providerS = localStorage.getItem("Provider") || "{}";
            let obj = JSON.parse(providerS);
            setProviderC(obj);
        }
        isDataLoad(true);
    }, []);

    // set localstorage
    useEffect(() => {
        if (!isLoad) return;
        localStorage.setItem("Provider", JSON.stringify(provider));
    }, [provider, isLoad]);

    let setProvider = (providerName: string, url: string) => {
        setProviderC({ name: providerName, url });
    };
    return (
        <providerContext.Provider value={{ provider, setProvider }}>
            {children}
        </providerContext.Provider>
    );
}
