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
  useEffect(() => {
    let get = async () => {
      let Class = new provider.class();
      let res = await Class.search(searchParams?.q || "");
      console.log(res);
      setData(res);
    };
    get();
  }, []);
  return (
    <Container>
      <Cards data={data} />
    </Container>
  );
}

export default Search;
