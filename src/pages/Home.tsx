import { TopBar } from "../components/TopBar"
import { List } from "../components/List";
import { useState } from "react"
import type { Worker } from "../types";

export const Home = () => {
    const [workers, setWorkers] = useState<Worker[] | null>(null);

    return (
        <>
            <TopBar setWorkers={setWorkers}/>
            <List info={workers} />
        </>
    )
}
