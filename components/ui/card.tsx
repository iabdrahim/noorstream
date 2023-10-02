"use client";
import { useContext } from "react";
import { providerContext } from "@/context/providers";
import Link from "next/link";
import { BiPlay } from "react-icons/bi";
import { tajawal } from "@/app/layout";
import { ICard } from "@/utils/providers/list";

let Card = ({ card }: { card: ICard }) => {
  let { provider } = useContext(providerContext);
  return (
    <div className="card flex relative rounded-xl justify-end h-80 transition-all flex-col gap-4 p-4 overflow-hidden shadow-textVisible">
      <img
        src={card.posterUrl}
        alt=""
        className="w-full h-full -z-10 absolute left-0 top-0 object-cover"
      />
      <div
        className="text flex justify-between items-start gap-2 w-full"
        dir="auto"
      >
        <div className="flex flex-col w-full">
          <Link
            href={card.url
              .replace("/watch", "")
              .split("/")
              .slice(2, -1)
              .join("/")}
          >
            <h3
              className={`${tajawal.className} text-lg font-bold text-ellipsis max-w-full`}
            >
              {card.title}
            </h3>
          </Link>

          <p className="text-neutral-100 font-futura text-xs">({card.year})</p>
        </div>
        <Link
          href={card.url
            .replace("/watch", "")
            .split("/")
            .slice(2, -1)
            .join("/")}
        >
          <div className="w-11 cursor-pointer flex justify-center items-center h-11 bg-white rounded-full border text-black min-w-fit">
            <BiPlay size={27} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Card;
