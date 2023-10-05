"use client";
import { useState, useEffect, useContext } from "react";
import Cards from "./ui/cards";
import { providerContext } from "@/context/providers";
import { ICard } from "@/utils/providers/list";
import { useQuery } from "react-query";

export default function Hero() {
  let { provider } = useContext(providerContext);
  let { data, isLoading } = useQuery<ICard[] | null>(
    "movies",
    async () => await new provider.class().getMainPage()
  );
  return <Cards data={data || null} loading={isLoading} />;
}
