// import SEO from "@/components/Common/SEO";
import React from "react";
import Aside from "./aside";
import Nav from "./nav";

function Container({
    children,
    fullWidth,
    className,
}: {
    children: any;
    fullWidth?: boolean;
    className?: string;
}) {
    return (
        <>
            <main
                className={`w-full flex items-start justify-between gap-4 transition-all h-full minHiegth mt-4 ${
                    !fullWidth
                        ? "max-w-[85rem] mx-auto px-4 max-md:px-2"
                        : "px-4 md:px-24"
                } ${!className ? "" : className}`}
            >
                <main className="w-full h-fit min-h-screen">
                    <Nav />
                    <div className="h-full w-full p-4 max-md:p-2 pt-0 ">
                        {children}
                    </div>
                </main>
                <Aside />
            </main>
        </>
    );
}
export default Container;
