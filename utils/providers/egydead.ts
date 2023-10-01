import { load, Element } from "cheerio";
import axios from "axios";

export default class EgyDead {
    lang: string;
    mainUrl: string;
    name: string;
    supportedTypes: string[];
    constructor() {
        this.lang = "ar";
        this.mainUrl = "https://a61.egydead.live";
        this.name = "egydead";
        this.supportedTypes = ["TvSeries", "Movie", "Anime"];
    }
    //utils {
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
