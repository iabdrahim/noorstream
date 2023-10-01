import EgyDead from "./egydead";
import MyCima from "./mycima";

export let providers = { mycima: MyCima, egydead: EgyDead };

export interface ICard {
  title: string;
  url: string;
  provider: string;
  type: string;
  posterUrl: string;
  year: string;
}
export interface IEpisode {
  name: string;
  url: string;
}
export interface ISeason {
  name: string;
  url: string;
}
export interface IDownLoad {
  resolution: string;
  url: string;
}

export interface ISingle {
  isMovie: boolean;
  year: string;
  url: string;
  posterUrl: string;
  title: string;
  story: string;
  watchServersList?: string[];
  downloadList?: IDownLoad[];
  episodes?: IEpisode[];
  seasons?: ISeason[];
}
