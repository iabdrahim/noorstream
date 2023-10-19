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
    let [provider, setProviderC] = useState({ name: "mycima", url: "" });

    let [isLoad, isDataLoad] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("providerName")) {
            let providerName = localStorage.getItem("providerName") || "";
            setProviderC({ ...provider, name: providerName });
        }
        isDataLoad(true);
    }, []);

    // set localstorage
    useEffect(() => {
        if (!isLoad) return;
        localStorage.setItem("providerName", provider.name);
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
