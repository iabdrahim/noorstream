"use client";

import { FaEarthAfrica } from "react-icons/fa6";
import { MdBookmark } from "react-icons/md";
import { RiShareLine } from "react-icons/ri";

export default function Options() {
    return (
        <div className="options mt-2 mr-2 h-fit flex gap-4 z-10">
            <div
                title="حفظ"
                className="rounded-full backdrop:blur-sm p-2 hover:bg-opacity-40 bg-black text-white bg-opacity-25 cursor-pointer"
            >
                <MdBookmark size={20} />
            </div>
            <div
                title="مشاركة"
                className="rounded-full backdrop:blur-sm p-2 bg-black text-white hover:bg-opacity-40 bg-opacity-25 cursor-pointer"
            >
                <RiShareLine size={20} />
            </div>
            <div
                title="website"
                className="rounded-full backdrop:blur-sm p-2 bg-black text-white hover:bg-opacity-40 bg-opacity-25 cursor-pointer"
            >
                <FaEarthAfrica size={20} />
            </div>
            {/* <div className="fixed px-4 max-w-[calc(100vw-26rem)] h-24 w-full z-10 right-0 bottom-0">
                <div className="bg w-full h-full bg-transparent shadow-actionsFooter absolute -rotate-180"></div>
                <div className="z-10">watch</div>
            </div> */}
        </div>
    );
}
