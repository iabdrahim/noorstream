"use client";

import { useState } from "react";
import { MdClose, MdArrowDropDown } from "react-icons/md";
import Spinner from "./spinner";
import DropMenu from "./dropmenu";

export default function Player({
  servers,
  setWatchPop,
}: {
  servers: string[] | null;
  setWatchPop: (b: boolean) => void;
}) {
  let [drop, setDrop] = useState(false);
  let [iframeInx, setIframe] = useState(0);
  return (
    <div className="card left-0 z-40 top-0 w-full h-screen fixed flex justify-center items-center">
      <div
        className="bg backdrop-blur-sm z-40 bg-black bg-opacity-20 w-full h-full absolute left-0 top-0"
        onClick={() => setWatchPop(false)}
      ></div>
      {servers ? (
        <div className="watch z-50 fixed max-w-5xl w-full h-[92vh] max-md:h-screen max-md:w-full border-2 border-[#222] rounded-xl gap-4 flex flex-col justify-center bg-[#0D0D0D] p-4">
          <div
            className="absolute right-4 top-4 rounded-full backdrop:blur-sm p-3 bg-[#1a1a1a] bg-opacity-25 cursor-pointer hover:bg-[#222]"
            onClick={() => setWatchPop(false)}
          >
            <MdClose size={18} />
          </div>
          <button
            className="relative drop font-futura cursor-pointer bg-[#222] rounded-xl px-4 mx-auto w-fit py-2 font-semibold flex gap-2 items-center"
            onClick={() => setDrop(!drop)}
          >
            <MdArrowDropDown />
            سرفرات المشاهدة
            {drop && (
              <DropMenu setDrop={setDrop} isBottom>
                {servers.map((s, i) => (
                  <button
                    dir="auto"
                    key={i}
                    className={`${
                      i == iframeInx ? "bg-[#222]" : ""
                    } w-full p-2 text-left rounded-lg hover:bg-[#222]`}
                    onClick={() => (setIframe(i), setDrop(false))}
                  >
                    {s.split(".")[0].replace("https://", "")}
                  </button>
                ))}
              </DropMenu>
            )}
          </button>
          <div className="video w-full h-full max-md:max-h-[30vh] rounded-xl bg-[#222] ">
            <iframe src={servers[iframeInx]} className="w-full h-full"></iframe>
          </div>
        </div>
      ) : (
        <div className="loading z-50 bg-[#222] w-40 h-40 rounded-2xl flex items-center justify-center">
          <Spinner />
        </div>
      )}
    </div>
  );
}
