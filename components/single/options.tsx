"use client";

import Link from "next/link";
import { FaEarthAfrica } from "react-icons/fa6";
import { MdBookmark } from "react-icons/md";
import { RiShareLine } from "react-icons/ri";

export default function Options({ url }: { url: string }) {
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
      <Link
        href={url}
        title="website"
        className="rounded-full backdrop:blur-sm p-2 bg-black text-white hover:bg-opacity-40 bg-opacity-25 cursor-pointer"
      >
        <FaEarthAfrica size={20} />
      </Link>
    </div>
  );
}
