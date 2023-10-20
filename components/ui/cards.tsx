"use client";

import { ICard } from "@/utils/providers/list";
import Card from "./card";
import CardLoader from "../loaders";

let Cards = ({
    data,
    loading,
}: {
    data: ICard[] | null;
    loading?: boolean;
}) => {
    return (
        <main className="cards mt-8 grid overflow-hidden p-2 mb-4 gap-4 items-start w-full">
            {data &&
                data?.slice(0, 16).map((m, i) => <Card key={i} card={m} />)}
            {loading && (
                <>
                    <CardLoader />
                    <CardLoader />
                    <CardLoader />
                    <CardLoader />
                    <CardLoader />
                    <CardLoader />
                    <CardLoader />
                </>
            )}
        </main>
    );
};
export default Cards;
