"use client";

import { ICard } from "@/utils/providers/list";
import Card from "./card";

let Cards = ({ data }: { data: ICard[] | null }) => {
  return (
    <main className="cards mt-8 grid overflow-hidden p-2 mb-4 gap-4 items-start w-full">
      {data && data.slice(0, 16).map((m, i) => <Card key={i} card={m} />)}
    </main>
  );
};
export default Cards;
