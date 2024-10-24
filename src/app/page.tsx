import { reactServerBinder } from "@/utils/db_binders";
import HomePage from "./HomePage";

export default reactServerBinder(async function Home() {
    console.debug('sdds', JSON.stringify({a: 1, b: 2}, null, 2))
    return (
        <HomePage />
    );
})
