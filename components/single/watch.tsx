"use client";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import Player from "../ui/player";
import { IDownLoad } from "@/utils/providers/list";
import { MdClose } from "react-icons/md";

export default function Watch({
  servers,
  downloadList,
}: {
  servers: string[];
  downloadList: IDownLoad[] | null;
}) {
  let [watchPop, setWatchPop] = useState(false);
  let [drop, setDrop] = useState(false);

  return (
    <div className="actions flex mt-8 w-full justify-start items-center gap-6">
      {watchPop && <Player servers={servers} setWatchPop={setWatchPop} />}
      <button
        className="see w-48 justify-center py-3 text-black font-semibold bg-white rounded-md flex items-center gap-2"
        onClick={() => setWatchPop(true)}
      >
        <FaPlay size={20} />
        مشاهدة
      </button>
      <button
        className="load w-48 justify-center relative bg-[#0D0D0D] py-3 font-semibold rounded-md flex items-center gap-2"
        onClick={() => setDrop(!drop)}
      >
        <FiDownload size={20} />
        تحميل
        {drop && (
          <div className="servers z-10 absolute bottom-11 left-2/4 -translate-x-2/4 flex border bg-[#0d0d0d] border-[#222] rounded-xl gap-2 p-2 flex-col w-64 max-md:fixed max-md:bottom-0 max-md:w-full max-md:h-64 max-md:transition-all max-md:p-2">
            <div className="close max-md:block hidden p-2 top-2 right-2 ">
              <MdClose />
            </div>
            {downloadList?.map((d, i) => (
              <a href={d.url} key={i} target="_blank">
                <button
                  dir="auto"
                  key={i}
                  className={` w-full p-2 text-left rounded-lg hover:bg-[#222]`}
                >
                  {d.resolution}
                </button>
              </a>
            ))}
          </div>
        )}
      </button>
    </div>
  );
}
