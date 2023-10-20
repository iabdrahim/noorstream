import axios from "axios";
import { useQuery } from "react-query";

const config = {
    mode: "no-cors",
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    },
};
export let API_BASE_URL = "https://noorstream-api.onrender.com";

let getProviders = () => {
    let { data, isLoading, error, refetch } = useQuery(
        "providers",
        async () => (await axios.get(API_BASE_URL + "/data", config)).data
    );
    return { data: data?.providers || null, isLoading, error, refetch };
};
let getHomePage = (provider: { name: string; url: string }) => {
    if (!provider.name) return { data: null, isLoading: false };
    let { data, isLoading, error, refetch } = useQuery(
        "home",
        async () =>
            (await axios.get(API_BASE_URL + "/data/" + provider.name, config))
                .data
    );
    return { data, isLoading, error, refetch };
};
let getSinglePage = (provider: { name: string; url: string }, slug: string) => {
    if (!provider.name) return { data: null, isLoading: false };

    let { data, isLoading, error, refetch } = useQuery(
        "singlePage",
        async () =>
            (
                await axios.get(
                    API_BASE_URL +
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
    if (!provider.name) return { data: null, isLoading: false };

    let { data, isLoading, error, refetch } = useQuery(
        "getSearch",
        async () =>
            (
                await axios.get(
                    API_BASE_URL + "/data/" + provider.name + "/search?q=" + q,
                    config
                )
            ).data
    );
    return { data, isLoading, error, refetch };
};
let getEpisode = async (
    provider: { name: string; url: string },
    url: string
) => {
    // let { data, isLoading, error, refetch } = useQuery(
    //     "episode",
    // async () =>
    let data = (
        await axios.get(
            API_BASE_URL + "/data/" + provider.name + "/episode?Url=" + url
        )
    ).data;
    // );
    return data;
};
let getSeason = async (
    provider: { name: string; url: string },
    url: string
) => {
    // let { data, isLoading, error, refetch } = useQuery(
    //     "season",
    //     async () =>
    let data = (
        await axios.get(
            API_BASE_URL + "/data/" + provider.name + "/season?Url=" + url,
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
