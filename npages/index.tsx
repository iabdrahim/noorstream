import Cards from "@/components/ui/cards";
import { providerContext } from "@/context/providers";
import { IMovie } from "@/utils/providers/list";
import { useContext, useState, useEffect } from "react";
import Container from "../components/Container";

export default async function Home() {
    let { provider } = useContext(providerContext);
    let [data, setData] = useState<IMovie[] | null>(null);
    useEffect(() => {
        let get = async () => {
            let Class = new provider.class();
            let res = await Class.getMainPage();
            console.log(res);
            setData(res);
        };
        get();
    }, []);
    return (
        <Container>
            <Cards data={data} />;
        </Container>
    );
}
