import useSWR from "swr";
import { IMovie } from "./providers/mycima";

function useAd(id: string | any) {
    const {
        data,
        error,
        isLoading,
    }: { data: IMovie; isLoading: boolean; error: undefined } = useSWR(
        `/api/ads/${id}`,
        (...args: [any]) => fetch(...args).then((res) => res.json());
    );

    return {
        ad: data?._id ? data : null,
        isLoading,
        error: error,
    };
}

export {
    useAd,
};
