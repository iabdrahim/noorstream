"use client";
import { useContext } from "react";
import Cards from "./ui/cards";
import { providerContext } from "@/context/providers";
import { getHomePage } from "@/utils/api";

export default function Hero() {
    let { provider } = useContext(providerContext);
    let { data, isLoading } = getHomePage(provider);
    return <Cards data={data} loading={isLoading} />;
}
