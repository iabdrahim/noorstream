import { load, Element } from "cheerio";
import axios from "axios";
import { IMovie } from "./list";

export default class MyCima {
    lang: string;
    mainUrl: string;
    name: string;
    supportedTypes: string[];
    constructor() {
        this.lang = "ar";
        this.mainUrl = "https://weciimaa.online";
        this.name = "mycima";
        this.supportedTypes = ["TvSeries", "Movie", "Anime"];
    }
    //utils {

    getImageURL(input: string | undefined) {
        if (!input) return null;
        return input.replace(/--im(age|g):url\(|\);/g, "");
    }
    toSearchResponse(element: any) {
        const url = element.find("div.Thumb--GridItem a").attr("href");
        const posterUrl = this.getImageURL(
            element.find("span.BG--GridItem").attr("data-lazy-style")
        );
        const year = element.find("div.GridItem span.year").text();
        let title = element
            .find("div.Thumb--GridItem strong")
            .text()
            .replace(year, "")
            .replace(/مشاهدة|فيلم|مسلسل|مترجم/g, "")
            .replace("( نسخة مدبلجة )", " ( نسخة مدبلجة ) ")
            .trim();

        const type = element
            .find("div.Thumb--GridItem a")
            .attr("title")
            .includes("فيلم")
            ? "Movie"
            : "TvSeries";

        return {
            title,
            url,
            provider: this.name,
            type,
            posterUrl,
            year: this.getIntFromText(year),
        };
    }
    getIntFromText(input: string | undefined) {
        if (!input) return null;
        const match = input.match(/\d+/);
        return match ? parseInt(match[0]) : null;
    }
    //}

    //components
    async getMainPage(page = ""): Promise<IMovie[] | null> {
        let list: {
            title: string;
            url: string;
            provider: string;
            type: string;
            posterUrl: string;
            year: string;
        }[] = [];
        const urls = [
            `${this.mainUrl}/seriestv/new/`,
            `${this.mainUrl}/movies/`,
        ];

        for (let url of urls) {
            let response = null;
            try {
                let res = await axios.get("/api/url?url=" + url);
                response = res.data;
            } catch (err: any) {
                console.error(err.message);
                return null;
            }
            const $ = load(response);

            $("div.Grid--WecimaPosts div.GridItem").each(
                (i: number, el: Element) => {
                    const searchResponse = this.toSearchResponse($(el));
                    if (searchResponse) {
                        list.push(searchResponse as any);
                    }
                }
            );
        }

        list = list.sort((a, b) => Math.random() - 0.5);
        return list;
    }
    async loadSeason(url: string) {
        let response = null;
        try {
            response = await axios.get("/api/url?url=" + url);
        } catch (err: any) {
            console.error(err.message);
            return null;
        }
        let $ = load(response?.data);
        let episodes: { name: string; url: string }[] = [];
        $("div.Episodes--Seasons--Episodes a").each(
            (i: number, el: Element) => {
                episodes.push({
                    url: $(el).attr("href") || "",
                    name: $(el).find("episodetitle").text(),
                });
            }
        );

        let downloadList: { resolution: string; url: string }[] = [];
        $("ul.Season--Download--Wecima--Single a").each(
            (i: number, el: Element) => {
                downloadList.push({
                    resolution: $(el).find("resolution").text().trim(),
                    url: $(el).attr("href") || "",
                });
            }
        );

        return { episodes, downloadList };
    }
    async loadEpisode(url: string) {
        let response = null;
        try {
            response = await axios.get("/api/url?url=" + url);
        } catch (err: any) {
            console.error(err.message);
            return null;
        }
        let $ = load(response?.data);
        const watchServersList: string[] = [];
        $("ul.WatchServersList li btn").each((i: number, el: Element) => {
            watchServersList.push(`${$(el).attr("data-url")}`);
        });
        let downloadList: { resolution: string; url: string }[] = [];

        $("ul.List--Download--Wecima--Single li").each(
            (i: number, el: Element) => {
                downloadList.push({
                    resolution: $(el).find("resolution").text().trim(),
                    url: $(el).find("a").attr("href") || "",
                });
            }
        );
        return { watchServersList, downloadList };
    }
    async search(query: string): Promise<IMovie[] | null> {
        const q = query.replace(/ /g, "%20");
        const result: IMovie[] = [];

        const searchUrls = [
            `${this.mainUrl}/search/${q}`,
            `${this.mainUrl}/search/${q}/list/series/`,
            `${this.mainUrl}/search/${q}/list/anime/`,
        ];

        for (const url of searchUrls) {
            let response = null;
            try {
                response = await axios.get("/api/url?url=" + url);
            } catch (err: any) {
                console.error(err.message);
                return null;
            }
            const $ = load(response?.data);

            $("div.Grid--WecimaPosts div.GridItem").each(
                (i: number, el: Element) => {
                    if (!$(el).text().includes("اعلان")) {
                        const searchResponse = this.toSearchResponse($(el));
                        if (searchResponse) {
                            result.push(searchResponse as any);
                        }
                    }
                }
            );
        }

        return result
            .filter(
                (value, index, self) =>
                    self.findIndex((item) => item.title === value.title) ===
                    index
            )
            .sort((a, b) => a.title.localeCompare(b.title));
    }
    async load(url: string) {
        let response = null;
        try {
            response = await axios.get("/api/url?url=" + url);
        } catch (err: any) {
            console.error(err.message);
            return null;
        }
        const doc = load(response?.data);

        const isMovie = doc("ol li:nth-child(3)").text().includes("افلام");
        let posterUrl = this.getImageURL(
            doc("wecima.separated--top").attr("data-lazy-style")
        );

        const year = doc("div.Title--Content--Single-begin h1 a.unline").text();
        let story = doc("div.StoryMovieContent").text();
        const title = doc("div.Title--Content--Single-begin h1")
            .text()
            .replace(`(${year})`, "")
            .replace(/مشاهدة|فيلم|مسلسل|مترجم|انمي/g, "");
        const watchServersList: string[] = [];
        doc("ul.WatchServersList li btn").each((i: number, el: Element) => {
            watchServersList.push(`${doc(el).attr("data-url")}`);
        });

        let downloadList: { url: string; resolution: string }[] = [];
        doc("ul.List--Download--Wecima--Single li").each(
            (i: number, el: Element) => {
                downloadList.push({
                    resolution: doc(el).find("resolution").text().trim(),
                    url: doc(el).find("a").attr("href") || "",
                });
            }
        );
        //if it is a movie
        if (!isMovie) {
            posterUrl = this.getImageURL(
                doc("wecima.separated--top").attr("style")
            );

            story = doc("singlecontainerleft .PostItemContent").text();
            let episodes: { name: string; url: string }[] = [];
            doc("div.Episodes--Seasons--Episodes a").each(
                (i: number, el: Element) => {
                    episodes.push({
                        url: doc(el).attr("href") || "",
                        name: doc(el).find("episodetitle").text(),
                    });
                }
            );
            let seasons: { name: string; url: string }[] = [];
            doc("div.List--Seasons--Episodes a").each(
                (i: number, el: Element) => {
                    seasons.push({
                        url: doc(el).attr("href") || "",
                        name: doc(el).text(),
                    });
                }
            );

            return {
                isMovie,
                year,
                posterUrl,
                title,
                story,
                episodes,
                seasons,
            };
        }

        return {
            isMovie,
            year,
            posterUrl,
            title,
            story,
            watchServersList,
            downloadList,
        };
    }
}

/*
Shema{
  getMainPage() =>  list[]
  load(url(exp:https://foo.com/movieName)) => 
  if it is a movie ? {
       isMovie, year, posterUrl, title, story, watchServersList, downloadList
  }
  {
   isMovie, year, posterUrl, title, story, episodes, seasons
  }
  
  loadSeason(url(exp:https://foo.com/boo-season-1))=>{
    episodes, downloadList 
  }
  
  loadEpisode(url(exp: https://foo.com/boo-ep-2))=> { watchServersList, downloadList }
   
}
*/