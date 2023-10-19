"use client";

import { FormEvent, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { tajawal } from "@/app/layout";
import { BiSearch } from "react-icons/bi";
import { providerContext } from "@/context/providers";
import Link from "next/link";
import DropMenu from "./ui/dropmenu";
import { getProviders } from "@/utils/api";

export default function Nav() {
    let { provider, setProvider } = useContext(providerContext);
    let r = useRouter();
    let {
        data: providers,
    }: {
        data: { name: string; url: string }[] | undefined;
        isLoading: boolean;
    } = getProviders();
    let handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        r.push("/search?q=" + (e.target as any).search.value || "");
    };
    let [showProviders, sShowProviders] = useState(false);
    return (
        <>
            <nav
                className="w-full sticky left-0 py-2 max-md:py-1 top-0 h-fit min-h-16 backdrop-blur-md flex justify-between z-20 items-center bg-black bg-opacity-10 mb-8 max-md:mb-2"
                id="sticky-nav"
            >
                <div className="w-full flex gap-4 max-md:gap-1 items-center">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full relative max-w-xs h-14 max-md:h-12 flex"
                    >
                        <button
                            type="submit"
                            className="absolute border border-[#1A1A1A] p-2 rounded-full bg-[#191919] right-3 top-2/4 -translate-y-2/4 max-md:p-1"
                        >
                            <BiSearch size={20} className="" />
                        </button>
                        <input
                            type="text"
                            placeholder="Search"
                            name="search"
                            className={`${tajawal.className} w-full outline-none border-[#0F0F0F] rounded-full border-2 h-full px-2 pr-14 max-md:pr-12 bg-[#0D0D0D] focus:border-[#1A1A1A]`}
                        />
                    </form>
                    <div className="relative md:hidden providers-mobile">
                        <button
                            className="fixed left-2 -bottom-[90vh] rounded-lg bg-[#222] py-2 px-4 flex z-20 justify-center items-center"
                            onClick={(e) => sShowProviders(true)}
                        >
                            {provider.name}
                        </button>
                        {showProviders && (
                            <DropMenu
                                classNames="-bottom-[90vh]"
                                setDrop={sShowProviders}
                            >
                                {providers &&
                                    providers.map((pk) => (
                                        <Link key={pk.name} href={"/"}>
                                            <button
                                                dir="auto"
                                                className={`w-full p-2 text-left rounded-lg hover:bg-[#222] ${
                                                    provider.name == pk.name &&
                                                    "bg-white hover:bg-white"
                                                }`}
                                            >
                                                {pk.name}
                                            </button>
                                        </Link>
                                    ))}
                            </DropMenu>
                        )}
                    </div>
                    <div className="providers max-md:hidden h-14 bg-[#0D0D0D] border-2 border-[#0F0F0F] flex gap-4 w-full rounded-full py-2 px-2">
                        {providers &&
                            providers.map((pk) => (
                                <Link href="/" key={pk.name}>
                                    <button
                                        className={`pro px-4 h-full flex justify-center items-center font-semibold capitalize rounded-full font-futura
                                ${
                                    provider.name == pk.name
                                        ? "bg-white text-black"
                                        : ""
                                }`}
                                        dir="auto"
                                        onClick={() =>
                                            setProvider(pk.name, pk.url)
                                        }
                                    >
                                        {pk.name}
                                    </button>
                                </Link>
                            ))}
                    </div>
                </div>
            </nav>
        </>
    );
}
