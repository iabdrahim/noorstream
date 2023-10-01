"use client";

import { FaCirclePlay } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { useContext, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { providerContext } from "@/context/providers";
import Player from "../ui/player";
export default function Episodes({
    seasons,
    episodesDefault,
}: {
    episodesDefault: null | { name: string; url: string }[];
    seasons: null | { name: string; url: string }[];
}) {
    let [drop, setDrop] = useState(false);
    let [episodes, setEpisodes] = useState(episodesDefault);
    let [seasonName, setSeasonN] = useState("");
    let { provider } = useContext(providerContext);
    let [watchPop, setWatchPop] = useState(false);
    let [watchPopSevers, setWatchServers] = useState<string[] | null>(null);

    let handleChangeSeason = async (s: { name: string; url: string }) => {
        setSeasonN(s.name);
        setEpisodes(null);
        let data = await new provider.class().loadSeason(s.url);
        if (data) {
            setEpisodes(data.episodes);
        }
    };

    let handleWatch = async (ep: { name: string; url: string }) => {
        setWatchPop(true);
        let data = await new provider.class().loadEpisode(ep.url);
        setWatchServers(data?.watchServersList || null);
    };
    return (
        <div className="episodes mt-10 gap-4 flex flex-col">
            <h2 className="w-full text-xl font-bold">الحلقات:</h2>
            <button
                className="relative drop font-futura cursor-pointer bg-[#222] rounded-xl px-4 w-fit py-2 font-semibold flex gap-2 items-center"
                onClick={() => setDrop(!drop)}
            >
                <MdArrowDropDown />
                سرفرات المشاهدة
                {drop && (
                    <div className="servers absolute top-11 left-2/4 -translate-x-2/4 flex border bg-[#0d0d0d] border-[#222] rounded-xl gap-2 p-2 flex-col w-64 ">
                        {seasons?.map((s, i) => (
                            <button
                                dir="auto"
                                className={`${
                                    s.name == seasonName ? "bg-[#222]" : ""
                                } w-full p-2 text-left rounded-lg hover:bg-[#222]`}
                                onClick={() => handleChangeSeason(s)}
                            >
                                {s.name}
                            </button>
                        ))}
                    </div>
                )}
            </button>
            <h2 className="w-full text-xl font-bold">الحلقات:</h2>
            <div className="flex gap-4 mt-2 w-full flex-col">
                {episodes?.reverse().map((ep, i) => (
                    <div
                        key={i}
                        className="ep bg-[#181818] hover:bg-[#282828] flex justify-between font-futura rounded-md px-4 py-3 font-semibold w-full max-w-lg"
                    >
                        {i + 1}. {ep.name}
                        <div className="actions flex gap-6 items-center">
                            <FaCirclePlay
                                className="text-white cursor-pointer"
                                size={22}
                                onClick={() => handleWatch(ep)}
                            />
                            <FiDownload size={22} className="cursor-pointer" />
                        </div>
                    </div>
                ))}
            </div>
            {watchPop && (
                <Player servers={watchPopSevers} setWatchPop={setWatchPop} />
            )}
        </div>
    );
}
