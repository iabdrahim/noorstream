"use client";
import { useState } from "react";
import { FaPlay } from "react-icons/fa6";
import { FiDownload } from "react-icons/fi";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import Player from "../ui/player";

export default function Watch({ servers }: { servers: string[] }) {
    let [watchPop, setWatchPop] = useState(false);
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
            <button className="load w-48 justify-center bg-[#0D0D0D] py-3 font-semibold rounded-md flex items-center gap-2">
                <FiDownload size={20} />
                تحميل
            </button>
        </div>
    );
}
