"use client";

import { FaCirclePlay } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { providerContext } from "@/context/providers";
import Episode from "../ui/epsiode";
import DropMenu from "../ui/dropmenu";
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
      setEpisodes(data.episodes?.reverse());
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
            <DropMenu setDrop={setDropS}>
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
            </DropMenu>
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
              <DropMenu setDrop={setDropDS}>
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
              </DropMenu>
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
