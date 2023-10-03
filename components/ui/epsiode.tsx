"use client";

import { providerContext } from "@/context/providers";
import { useContext, useState } from "react";
import { FaCirclePlay } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import Player from "./player";

const Episode = ({ ep }: { ep: { name: string; url: string } }) => {
  let { provider } = useContext(providerContext);
  let [watchPop, setWatchPop] = useState(false);
  let [watchPopSevers, setWatchServers] = useState<string[] | null>(null);
  let [DownloadList, setDownList] = useState<
    | {
        resolution: string;
        url: string;
      }[]
    | null
  >(null);
  let [drop, setDrop] = useState(false);

  let handleWatch = async (ep: { name: string; url: string }) => {
    setWatchPop(true);
    let data = await new provider.class().loadEpisode(ep.url);
    setWatchServers(data?.watchServersList || null);
  };

  //get episode download urls
  let handleDownload = async (ep: { name: string; url: string }) => {
    if (drop) {
      setDrop(false);
      return;
    }
    setDownList(null);
    setDrop(true);
    let data = await new provider.class().loadEpisode(ep.url);
    setDownList(data?.downloadList || null);
  };
  return (
    <div className="ep bg-[#181818] hover:bg-[#282828] flex justify-between font-futura rounded-md px-4 py-3 font-semibold w-full max-w-lg">
      {ep.name}
      <div className="actions flex gap-6 items-center">
        <FaCirclePlay
          className="text-white cursor-pointer"
          size={22}
          onClick={() => handleWatch(ep)}
        />
        <button
          className="relative drop font-semibold flex gap-2 items-center"
          onClick={() => handleDownload(ep)}
        >
          <FiDownload size={22} className="cursor-pointer" />

          {drop && (
            <div className="servers z-10 max-md:left-0 max-md:translate-x-0 absolute bottom-11 left-2/4 -translate-x-2/4 flex border bg-[#0d0d0d] border-[#222] rounded-xl gap-2 p-2 flex-col w-64 max-md:fixed max-md:bottom-0 max-md:w-full max-md:h-64 max-md:transition-all max-md:p-2">
              {DownloadList?.map((d, i) => (
                <a href={d.url} key={i} target="_blank">
                  <button
                    dir="auto"
                    className={`w-full p-2 text-left rounded-lg hover:bg-[#222]`}
                  >
                    {d.resolution}
                  </button>
                </a>
              ))}
            </div>
          )}
        </button>
      </div>
      {watchPop && (
        <Player servers={watchPopSevers} setWatchPop={setWatchPop} />
      )}
    </div>
  );
};

export default Episode;
