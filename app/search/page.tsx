"use client";

import Container from "@/components/Container";
import Cards from "@/components/ui/cards";
import { providerContext } from "@/context/providers";
import { ICard } from "@/utils/providers/list";
import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";

function Search({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  let { provider } = useContext(providerContext);
  let { data, isLoading } = useQuery<ICard[] | null>(
    "moviesSearch",
    async () => await new provider.class().search(searchParams?.q || "")
  );
  return (
    <Container>
      <Cards data={data} loading={isLoading} />
    </Container>
  );
}

export default Search;
