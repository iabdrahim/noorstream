"use client";

import { FaCirclePlay } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import { providerContext } from "@/context/providers";
import Episode from "../ui/epsiode";
export default function Episodes({
  seasons,
  episodesDefault,
}: {
  episodesDefault: null | { name: string; url: string }[];
  seasons: null | { name: string; url: string }[];
}) {
  let [dropS, setDropS] = useState(false);
  let [dropDS, setDropDS] = useState(false);
  let [episodes, setEpisodes] = useState(episodesDefault);
  let [seasonName, setSeasonN] = useState("المواسم");
  let { provider } = useContext(providerContext);

  let [DownloadSeason, setDownloadSeason] = useState<
    | {
        resolution: string;
        url: string;
      }[]
    | null
  >(null);
  let handleChangeSeason = async (s: { name: string; url: string }) => {
    setSeasonN(s.name);
    setEpisodes(null);
    let data = await new provider.class().loadSeason(s.url);
    if (data) {
      setEpisodes(data.episodes);
      setDownloadSeason(data.downloadList);
    }
  };
  useEffect(() => {
    let get = async () => {
      if (!seasons) return;
      let data = await new provider.class().loadSeason(seasons[0].url);
      if (data) {
        setDownloadSeason(data.downloadList);
      }
    };
    get();
  }, [seasons]);

  return (
    <div className="episodes mt-10 gap-4 flex flex-col">
      <h2 className="w-full text-xl font-bold">الحلقات:</h2>
      <div className="flex gap-4">
        <button
          className="relative drop font-futura cursor-pointer rounded-xl px-4 w-fit py-2 font-semibold flex gap-2 items-center bg-[#222]"
          onClick={() => setDropS(!dropS)}
        >
          <MdArrowDropDown />
          {seasonName}
          {dropS && (
            <div className="servers absolute top-11 left-2/4 -translate-x-2/4 flex border bg-[#0d0d0d] border-[#222] rounded-xl gap-2 p-2 flex-col w-64 ">
              {seasons?.map((s, i) => (
                <button
                  dir="auto"
                  key={i}
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
        {DownloadSeason && (
          <button
            className="relative drop font-futura cursor-pointer rounded-xl px-4 w-fit py-2 font-semibold flex gap-2 items-center"
            onClick={() => setDropDS(!dropDS)}
          >
            <FiDownload />
            تحميل الموسم كاملا
            {dropDS && (
              <div className="servers absolute top-11 z-10 left-2/4 -translate-x-2/4 flex border bg-[#0d0d0d] border-[#222] rounded-xl gap-2 p-2 flex-col w-64 ">
                {DownloadSeason?.map((s, i) => (
                  <a href={s.url} target="_blank" key={i}>
                    <button
                      dir="auto"
                      key={i}
                      className={`w-full p-2 text-left rounded-lg hover:bg-[#222]`}
                    >
                      {s.resolution}
                    </button>
                  </a>
                ))}
              </div>
            )}
          </button>
        )}
      </div>
      <h2 className="w-full text-xl font-bold">الحلقات:</h2>
      <div className="flex gap-4 mt-2 w-full flex-col">
        {episodes?.reverse().map((ep, i) => (
          <Episode ep={ep} key={i} />
        ))}
      </div>
    </div>
  );
}
