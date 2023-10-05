"use client";
import { useState, useEffect, useContext } from "react";
import Cards from "./ui/cards";
import { providerContext } from "@/context/providers";
import { ICard } from "@/utils/providers/list";

export default function Hero() {
  let { provider } = useContext(providerContext);
  let [data, setData] = useState<ICard[] | null>(null);
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    let get = async () => {
      let Class = new provider.class();
      let res = await Class.getMainPage();
      console.log("data", res);
      setData(res);
      if (Array.isArray(res)) {
        setLoading(false);
      }
    };
    get();
  }, []);
  return <Cards data={data} loading={loading} />;
}
