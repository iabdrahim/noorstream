import axios from "axios";
import { useQuery } from "react-query";

const config = {
    mode: "no-cors",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
};
let BASE_URL = "https://noorstream-api.onrender.com";

let getProviders = () => {
    let { data, isLoading, error, refetch } = useQuery(
        "providers",
        async () => (await axios.get(BASE_URL + "/data", config)).data
    );
    return { data: data?.providers || null, isLoading, error, refetch };
};
let getHomePage = (provider: { name: string; url: string }) => {
    let { data, isLoading, error, refetch } = useQuery(
        "home",
        async () =>
            (await axios.get(BASE_URL + "/data/" + provider.name, config)).data
    );
    return { data, isLoading, error, refetch };
};
let getSinglePage = (provider: { name: string; url: string }, slug: string) => {
    let { data, isLoading, error, refetch } = useQuery(
        "singlePage",
        async () =>
            (
                await axios.get(
                    BASE_URL +
                        "/data/" +
                        provider.name +
                        "?Url=" +
                        provider.url +
                        "/" +
                        slug,
                    config
                )
            ).data
    );
    return { data, isLoading, error, refetch };
};
let getSearch = (provider: { name: string; url: string }, q: string) => {
    let { data, isLoading, error, refetch } = useQuery(
        "getSearch",
        async () =>
            (
                await axios.get(
                    BASE_URL + "/data/" + provider.name + "/search?q=" + q,
                    config
                )
            ).data
    );
    return { data, isLoading, error, refetch };
};
let getEpisode = async (
    provider: { name: string; url: string },
    slug: string
) => {
    // let { data, isLoading, error, refetch } = useQuery(
    //     "episode",
    // async () =>
    let data = (
        await axios.get(
            BASE_URL +
                "/data/" +
                provider.name +
                "/episode?Url=" +
                provider.url +
                "/" +
                slug,
            config
        )
    ).data;
    // );
    return data;
};
let getSeason = async (
    provider: { name: string; url: string },
    slug: string
) => {
    // let { data, isLoading, error, refetch } = useQuery(
    //     "season",
    //     async () =>
    let data = (
        await axios.get(
            BASE_URL +
                "/data/" +
                provider.name +
                "/season?Url=" +
                provider.url +
                "/" +
                slug,
            config
        )
    ).data;
    // );
    return data;
};
export {
    getProviders,
    getHomePage,
    getEpisode,
    getSearch,
    getSeason,
    getSinglePage,
};
