"use client";

import Container from "@/components/Container";
import Cards from "@/components/ui/cards";
import { providerContext } from "@/context/providers";
import { getSearch } from "@/utils/api";
import { ICard } from "@/utils/providers/list";
import axios from "axios";
import React, { useContext, useState, useEffect } from "react";
import { useQuery } from "react-query";

function Search({
    searchParams,
}: {
    searchParams?: { [key: string]: string | undefined };
}) {
    let { provider } = useContext(providerContext);
    let { data, isLoading } = getSearch(provider, searchParams?.q || "");
    return (
        <Container>
            <Cards data={data} loading={isLoading} />
        </Container>
    );
}

export default Search;
