"use client";
import { useEffect, useContext, useState } from "react";
import Container from "@/components/Container";
import Episodes from "@/components/single/episodes";
import Options from "@/components/single/options";
import Watch from "@/components/single/watch";
import { providerContext } from "@/context/providers";
import { ISingle } from "@/utils/providers/list";

export default function Page({ params }: { params: { slug: string[] } }) {
  let { provider } = useContext(providerContext);
  let [data, setData] = useState<ISingle | null>(null);
  useEffect(() => {
    let get = async () => {
      let Class = new provider.class();
      let res = await Class.load(`${Class.mainUrl}/${params.slug.join("/")}`);
      console.log(res);
      setData(res);
    };
    get();
  }, []);
  return (
    <Container>
      {data?.title ? (
        <div className="w-full h-full">
          <div className="flex flex-col gap-1 overflow-hidden relative w-full h-full">
            <div className="image overflow-hidden rounded-t-xl shadow-poster absolute left-0 top-0 h-[25rem] w-full">
              <img
                src={data.posterUrl}
                alt=""
                className="w-full h-full object-cover relative -z-10"
              />
            </div>
            <Options url={data.url} />

            <div className="text flex-col flex mt-[19rem] relative z-10">
              <h1 className="text-3xl font-extrabold">{data.title}</h1>
              <div className="mt-6 flex gap-4 flex-colflex-wrap items-center">
                <span className="bg-[#181818] w-fit rounded-sm py-2 px-2 text-gray-100 font-futura font-medium text-xs capitalize">
                  {new provider.class().mainUrl.replace("https://", "")}
                </span>
                <span className="font-medium">
                  {data.isMovie ? "فيلم" : "مسلسل"}
                </span>
                <span className="font-medium font-futura">{data.year}</span>
                <span className="font-medium font-futura">8,3/10.0</span>
                <span className="font-medium font-futura">120 دقيقة</span>
              </div>
              <p className="text-gray-300 font-medium mt-6">{data.story}</p>
            </div>
          </div>
          {data.watchServersList && (
            <Watch
              servers={data.watchServersList}
              downloadList={data.downloadList || null}
            />
          )}
          {!data?.isMovie && (
            <Episodes
              episodesDefault={data.episodes || null}
              seasons={data.seasons || null}
            />
          )}
        </div>
      ) : (
        <h1>loading</h1>
      )}
    </Container>
  );
}
