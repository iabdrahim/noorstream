import EgyDead from "./egydead";
import MyCima from "./mycima";

export let providers = { mycima: MyCima, egydead: EgyDead };

export interface IMovie {
    title: string;
    url: string;
    provider: string;
    type: string;
    posterUrl: string;
    year: string;
}
