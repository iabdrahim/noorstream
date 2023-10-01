"use client";

import Link from "next/link";
import { useRef } from "react";
import { BiPlay, BiTime } from "react-icons/bi";
import { MdArrowDropDown, MdClose } from "react-icons/md";
import { PiBookmarkSimpleDuotone } from "react-icons/pi";

export default function Aside() {
    return (
        <aside className="rounded-lg max-w-sm sticky top-0 w-full h-screen flex flex-col items-start p-2 max-md:hidden gap-4">
            <header className="w-full flex justify-between items-center">
                <div className="right"></div>
                <div className="left flex gap-4 items-center">
                    <div className="saved">
                        <PiBookmarkSimpleDuotone size={24} />
                    </div>
                    <div className="user flex gap-3 bg-[#0D0D0D] border-2 border-[#0F0F0F] rounded-full py-1 px-3 items-center w-fit">
                        <div className="name font-futura font-medium flex gap-1 items-center">
                            <MdArrowDropDown />
                            Nobi
                        </div>
                        <div className="image min-w-fit">
                            <img
                                src="https://i.scdn.co/image/ab67757000003b821b28413da0788ced5fb79e99"
                                alt="profile avatar"
                                className="w-11 h-11 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>
            <div className="recently w-full mt-6 flex flex-col gap-4">
                <h3 className="w-full flex gap-2 items-center font-bold text-lg">
                    <BiTime />
                    ما شاهدته مؤخرا
                </h3>
                <div
                    className="movie relative w-full h-48 rounded-xl border border-gray-600 flex justify-between items-end shadow-textVisible px-4 py-4 overflow-hidden"
                    dir="auto"
                >
                    <div className="absolute right-4 top-2 rounded-full backdrop:blur-sm p-2 bg-black bg-opacity-25 cursor-pointer">
                        <MdClose size={18} />
                    </div>
                    <img
                        className="w-full cover-object h-full pointer-events-none left-0 top-0 absolute -z-10 blur-[2px]"
                        src="https://wallpapers.com/images/hd/breaking-bad-series-cover-7lj0pi78smszhiqt.jpg"
                    />
                    <div className="flex justify-between items-start flex-col gap-1">
                        <div className="text-white text-[22px] font-bold font-futura">
                            Breacking Bad
                        </div>
                        <div className="text-neutral-100 text-xs font-bold font-futura">
                            Episode 1
                        </div>
                    </div>
                    <Link href={"/provider/bad"}>
                        <div className="w-11 cursor-pointer flex justify-center items-center h-11 bg-white rounded-full border text-black">
                            <BiPlay size={27} />
                        </div>
                    </Link>
                </div>
                <div
                    className="movie relative w-full h-48 rounded-xl border border-gray-600 flex justify-between items-end shadow-textVisible px-4 py-4 overflow-hidden"
                    dir="auto"
                >
                    <div className="absolute right-4 top-2 rounded-full backdrop:blur-sm p-2 bg-black bg-opacity-25 cursor-pointer">
                        <MdClose size={18} />
                    </div>
                    <img
                        className="w-full cover-object h-full pointer-events-none blur-[2px] left-0 top-0 absolute -z-10"
                        src="https://wallpapers.com/images/hd/breaking-bad-series-cover-7lj0pi78smszhiqt.jpg"
                    />
                    <div className="flex justify-between items-start flex-col gap-1">
                        <div className="text-white text-[22px] font-bold font-futura tex">
                            Breacking Bad
                        </div>
                        <div className="text-neutral-100 text-xs font-bold font-futura text-ellipsis">
                            Episode 1
                        </div>
                    </div>
                    <Link href={"/provider/bad"}>
                        <div className="w-11 cursor-pointer flex justify-center items-center h-11 bg-white rounded-full border text-black">
                            <BiPlay size={27} />
                        </div>
                    </Link>
                </div>
            </div>
        </aside>
    );
}
