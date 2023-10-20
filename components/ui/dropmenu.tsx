"use client";

import { MdClose } from "react-icons/md";
import Spinner from "./spinner";

let DropMenu = ({
    children,
    setDrop,
    isBottom,
    classNames,
}: {
    children: React.JSX.Element[] | undefined;
    setDrop: (v: boolean) => void;
    isBottom?: boolean;
    classNames?: string;
}) => {
    return (
        <div
            className={`servers z-10 max-md:translate-x-0 absolute ${
                isBottom ? "md:top-10" : "md:bottom-10"
            } max-md:left-0 left-2/4 -translate-x-2/4 flex border bg-[#0d0d0d] border-[#222] rounded-xl gap-2 p-2 flex-col w-64 max-md:fixed max-md:bottom-0 max-md:w-full max-md:min-h-64 max-md:h-fit max-md:transition-all max-md:py-4 overflow-auto min-h-[16rem] ${classNames}`}
        >
            <button
                className="close max-md:block rounded-full hidden p-2 max-w-fit top-2 right-2 hover:bg-[#222222] cursor-pointer"
                onClick={() => setDrop(false)}
            >
                <MdClose />
            </button>
            {children == undefined ? <Spinner /> : children}
        </div>
    );
};

export default DropMenu;
