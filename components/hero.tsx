"use client";
import { useState, useEffect, useContext } from "react";
import Cards from "./ui/cards";
import { providerContext } from "@/context/providers";
import { IMovie } from "@/utils/providers/list";

export default function Hero() {
    let { provider } = useContext(providerContext);
    let [data, setData] = useState<IMovie[] | null>(null);
    useEffect(() => {
        let get = async () => {
            let Class = new provider.class();
            let res = await Class.getMainPage();
            console.log("data", res);
            setData(res);
        };
        get();
    }, []);
    return <Cards data={data} />;
}
