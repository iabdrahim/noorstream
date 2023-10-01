"use client";

import { providers } from "@/utils/providers/list";
import {
    ClassType,
    ReactNode,
    createContext,
    useEffect,
    useState,
} from "react";

export const providerContext = createContext({
    provider: { name: "mycima", class: providers.mycima },
    setProvider: (s: string) => {},
});

export default function MovieProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    let [provider, setProviderC] = useState<{
        name: string;
        class: ClassType<any, any, any>;
    }>({
        name: "mycima",
        class: providers.mycima,
    });

    let [isLoad, isDataLoad] = useState(false);
    useEffect(() => {
        if (localStorage.getItem("provider")) {
            let providerName = localStorage.getItem("providerName") || "";
            let Provider = Object.entries(providers).find(
                (e) => e[0] == providerName
            )?.[1];
            if (!Provider) return;
            setProviderC({
                ...provider,
                class: Provider,
                name: providerName,
            });
        }
        isDataLoad(true);
    }, []);
    useEffect(() => {}, [provider]);

    // get localstorage
    useEffect(() => {
        if (!isLoad) return;
        // console.log(new provider.class().name);
        localStorage.setItem("providerName", provider.name);
    }, [provider, isLoad]);

    let setProvider = (s: string) => {
        if (!s.trim()) {
            console.error("this provider name is not valid");
            return;
        }
        if (!Object.entries(providers).some((e) => e[0] == s)) {
            console.error("this provider does not exist yet !");
            return;
        }
        let Provider = Object.entries(providers).find((e) => e[0] == s);
        let myclass = Provider?.[1] || providers.mycima;
        setProviderC({ ...provider, name: s, class: myclass });
    };
    return (
        <providerContext.Provider value={{ provider, setProvider }}>
            {children}
        </providerContext.Provider>
    );
}
