"use client";

import Container from "@/components/Container";
import Cards from "@/components/ui/cards";
import { providerContext } from "@/context/providers";
import { ICard } from "@/utils/providers/list";
import React, { useContext, useState, useEffect } from "react";

function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  let { provider } = useContext(providerContext);
  let [data, setData] = useState<ICard[] | null>(null);
  let [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    let get = async () => {
      let Class = new provider.class();
      let res = Class.search(searchParams?.q || "");
      let res1 = Class.search(searchParams?.q || "", "anime");
      let res2 = Class.search(searchParams?.q || "", "series");
      let promise = await Promise.all([res, res1, res2]);
      console.log(promise);
      let arr: ICard[] = [];
      // arr = [].concat(...promise);
      promise.forEach((ar) => ar != null && [arr, ...ar.slice(0, 12)]);
      console.log(arr);
      setData(arr);
      if (Array.isArray(promise)) {
        setLoading(false);
      }
    };
    get();
  }, []);
  return (
    <Container>
      <Cards data={data} loading={loading} />
    </Container>
  );
}

export default Search;
