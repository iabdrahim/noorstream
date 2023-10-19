"use client";
import { MdArrowDropDown } from "react-icons/md";
import {
    PiFilmSlateBold,
    PiHouseBold,
    PiTelevisionSimpleBold,
} from "react-icons/pi";
import { BiCollection } from "react-icons/bi";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";

export default function Aside() {
    let [showAside, setShow] = useState(false);
    return (
        <aside
            className={`rounded-xl max-w-[18rem] sticky top-0 left-0 w-full h-screen flex flex-col items-start p-2 max-md:fixed justify-start gap-4 z-20 ${
                showAside
                    ? "max-md:max-w-xs max-md:pt-2 max-md:bg-[#0D0D0D]"
                    : "max-md:h-full max-md:max-w-fit pt-2"
            }`}
        >
            <header className="w-full flex justify-between md:mb-12 items-center">
                <div className="right"></div>
                <div className="left flex gap-4 items-center">
                    {/* <div className="saved">
            <PiBookmarkSimpleDuotone size={24} />
          </div> */}
                    <div className="user flex gap-3 bg-[#0D0D0D] border-2 border-[#0F0F0F] rounded-full py-1 px-2 items-center w-fit">
                        <div
                            className={`name font-futura font-medium trans flex gap-1 items-center ${
                                !showAside &&
                                "max-md:opacity-0 max-md:w-0 max-md:pointer-events-none"
                            }`}
                        >
                            <MdArrowDropDown />
                            User
                        </div>
                        <div
                            className="image min-w-fit"
                            onClick={() => setShow(!showAside)}
                        >
                            <img
                                src="https://i.scdn.co/image/ab67757000003b821b28413da0788ced5fb79e99"
                                alt="profile avatar"
                                className="w-11 h-11 rounded-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </header>
            <div
                className={`navigation w-full flex flex-col gap-6 trans ${
                    !showAside && "max-md:opacity-0 max-md:pointer-events-none"
                }`}
            >
                <div className="btn text-black bg-white w-full rounded-full py-[0.82rem] px-4 flex gap-4 items-center font-bold cursor-pointer">
                    <PiHouseBold size="24" /> الرئيسية
                </div>
                <div className="btn text-white w-full hover:bg-[#0D0D0D] rounded-full flex py-[0.82rem] px-4 gap-4 items-cente transition-all font-bold cursor-pointer">
                    <PiFilmSlateBold size="24" /> الأفلام
                </div>
                <div className="btn text-white w-full rounded-full flex py-[0.82rem] px-4 gap-4 items-center hover:bg-[#0D0D0D] transition-all font-bold cursor-pointer">
                    <PiTelevisionSimpleBold size="24" /> المسلسلات
                </div>
                <div className="btn text-white w-full rounded-full flex py-[0.82rem] px-4 gap-4 items-center hover:bg-[#0D0D0D] transition-all font-bold cursor-pointer">
                    <BiCollection size="24" /> المكتبة
                </div>
            </div>
            <div className="foot w-full flex gap-4 max-md:hidden"></div>
        </aside>
    );
}
