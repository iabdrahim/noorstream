"use client";

import { IMovie } from "@/utils/providers/list";
import Card from "./card";

let Cards = ({ data }: { data: IMovie[] | null }) => {
    return (
        <main className="cards mt-8 grid overflow-hidden p-2 mb-4 gap-4 items-start w-full">
            {data &&
                data.map((m, i) => (
                    <Card
                        key={i}
                        posterUrl={m.posterUrl}
                        title={m.title}
                        year={m.year}
                        url={m.url}
                    />
                ))}
        </main>
    );
};
export default Cards;
